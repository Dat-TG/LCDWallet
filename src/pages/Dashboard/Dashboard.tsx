import React, { useEffect, useState } from 'react';
import Meta from '@/components/Meta';
import WalletState, { useWalletActions } from '@/store/wallet';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import useNotifications from '@/store/notifications';
import TransactionDialog from './TransactionDialog';
import { getBalance, getTransactionHistory, sendTransaction } from '@/api/wallet/apiWallet';
import { Block } from '@/api/blockchain/type';
import { getLatestBlocks } from '@/api/blockchain/apiBlockchain';
import { TransactionDetails } from '@/api/wallet/type';
import Loading from '@/components/Loading';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
);

const useStyles = {
  root: {
    flexGrow: 1,
    padding: '24px',
  },
  card: {
    margin: 2,
  },
  table: {
    minWidth: 650,
  },
  tableCell: {
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    maxWidth: 150,
  },
  doughnutContainer: {
    margin: '0 auto',
    maxWidth: '300px',
  },
  button: {
    margin: '8px',
  },
};

function Dashboard() {
  const classes = useStyles;
  const [wallet] = useRecoilState(WalletState);
  const { logOut } = useWalletActions();

  const [, actions] = useNotifications();

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<TransactionDetails[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetails | null>(null);
  const [openTransaction, setOpenTransaction] = useState(false);

  const handleRowClick = (transaction: TransactionDetails) => {
    setSelectedTransaction(transaction);
    setOpenTransaction(true);
  };

  const handleRowClose = () => {
    setOpenTransaction(false);
    setSelectedTransaction(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTransaction = () => {
    // Handle the transaction logic here
    console.log('Transaction made to', address, 'of amount', amount);
    sendTransaction(wallet.publicKey, address, parseFloat(amount), wallet.privateKey).then(
      (transaction) => {
        console.log('Transaction:', transaction);
        actions.push({ message: 'Transaction successful', options: { variant: 'success' } });
      },
    );
    setOpen(false);
  };

  const handleLogout = () => {
    // Handle the logout logic here
    console.log('User logged out');
    logOut();
  };

  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);

  const [balance, setBalance] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactionData, setTransactionData] = useState<any>();

  useEffect(() => {
    // Fetch latest blocks, transactions, and balance here
    getBalance(wallet.publicKey).then((balance) => {
      console.log('Balance:', balance);
      setBalance(balance);
    });
    getLatestBlocks().then((blocks) => {
      console.log('Latest blocks:', blocks);
      setLatestBlocks(blocks);
    });
    getTransactionHistory(wallet.publicKey).then((transactions) => {
      console.log('Transaction history:', transactions);
      setTransactions(transactions);
      // Get total sent and received transactions
      let totalReceived = 0;
      let totalSent = 0;

      transactions.forEach((transaction) => {
        if (transaction.toAddress === wallet.publicKey) {
          totalReceived += transaction.amount;
        }
        if (transaction.fromAddress === wallet.publicKey) {
          totalSent += transaction.amount;
        }
      });
      console.log('Total received:', totalReceived);
      console.log('Total sent:', totalSent);
      const transactionDataTemp = {
        labels: ['Received', 'Sent'],
        datasets: [
          {
            data: [totalReceived, totalSent], // Example data: 3.5 LCD received, 0.5 LCD sent
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      };
      setTransactionData(transactionDataTemp);
    });
  }, [address, wallet.publicKey]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'NEW_BLOCK':
          setLatestBlocks((prevBlocks) => [message.block, ...prevBlocks].slice(0, 5));
          break;

        case 'NEW_TRANSACTION':
          // setTransactions((prevTransactions) => [...prevTransactions, message.transaction]);
          break;

        case 'BALANCE_UPDATE':
          if (message.address === wallet.publicKey) {
            setBalance(message.balance);
          }
          break;

        default:
          console.log('Unknown message type:', message.type);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, [wallet.publicKey]);

  if (!wallet.privateKey || !wallet.publicKey) {
    return <Navigate to="/wallet/access" />;
  }

  return (
    <>
      <Meta title="Dashboard" />
      <Container style={classes.root}>
        <Typography variant="h4" gutterBottom fontWeight={'bold'}>
          LCDWallet Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Card style={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Wallet Information
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    ':hover': {
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(wallet.privateKey);
                    actions.push({ message: 'Private key copied to clipboard' });
                  }}
                >
                  Private Key: {wallet.privateKey}
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    ':hover': {
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(wallet.publicKey);
                    actions.push({ message: 'Public key copied to clipboard' });
                  }}
                >
                  Address: {wallet.publicKey}
                </Typography>
              </CardContent>
              <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={classes.button}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={classes.button}
                  onClick={handleClickOpen}
                >
                  Make Transactions
                </Button>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card style={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Balance
                </Typography>
                <Typography color="textSecondary">Balance: {balance} LCD</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card style={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Latest Blocks
                </Typography>
                <Table style={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Height</TableCell>
                      <TableCell>Hash</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {latestBlocks.map((block, index) => (
                      <TableRow key={index}>
                        <TableCell>{block.index}</TableCell>
                        <TableCell
                          sx={{
                            maxWidth: '80px',
                          }}
                        >
                          <Typography
                            sx={{
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              ':hover': {
                                cursor: 'pointer',
                              },
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText(block.hash);
                              actions.push({ message: 'Hash copied to clipboard' });
                            }}
                          >
                            {block.hash}
                          </Typography>
                        </TableCell>
                        <TableCell>{new Date(block.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card style={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Transaction Types
                </Typography>
                <div style={classes.doughnutContainer}>
                  {transactionData ? <Doughnut data={transactionData} /> : <Loading />}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card style={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Transaction History
                </Typography>
                <Table style={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction, index) => (
                      <Box
                        component="tr"
                        key={index}
                        onClick={() => handleRowClick(transaction)}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableCell style={classes.tableCell}>
                          {new Date(transaction.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell style={classes.tableCell}>{transaction.id}</TableCell>
                        <TableCell style={classes.tableCell}>{transaction.amount} LCD</TableCell>
                        <TableCell style={classes.tableCell}>{transaction.status}</TableCell>
                        <TableCell style={classes.tableCell}>{transaction.id}</TableCell>
                        <TableCell style={classes.tableCell}>{transaction.fromAddress}</TableCell>
                        <TableCell style={classes.tableCell}>{transaction.toAddress}</TableCell>
                      </Box>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <TransactionDialog
        open={open}
        handleClose={handleClose}
        handleTransaction={handleTransaction}
        address={address}
        setAddress={setAddress}
        amount={amount}
        setAmount={setAmount}
      />
      <Dialog
        open={openTransaction}
        onClose={handleRowClose}
        aria-labelledby="transaction-dialog-title"
      >
        <DialogTitle id="transaction-dialog-title">Transaction Details</DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <>
              <DialogContentText>
                <strong>ID:</strong> {selectedTransaction.id}
              </DialogContentText>
              <DialogContentText>
                <strong>Status:</strong> {selectedTransaction.status}
              </DialogContentText>
              <DialogContentText>
                <strong>From:</strong> {selectedTransaction.fromAddress}
              </DialogContentText>
              <DialogContentText>
                <strong>To:</strong> {selectedTransaction.toAddress}
              </DialogContentText>
              <DialogContentText>
                <strong>Amount:</strong> {selectedTransaction.amount} LCD
              </DialogContentText>
              <DialogContentText>
                <strong>Date:</strong> {new Date(selectedTransaction.timestamp).toLocaleString()}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRowClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Dashboard;
