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
import { getBalance } from '@/api/wallet/apiWallet';
import { Block } from '@/api/blockchain/type';
import { getLatestBlocks } from '@/api/blockchain/apiBlockchain';

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
    margin: '16px',
  },
  table: {
    minWidth: 650,
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
  const { logOut, updateBalance } = useWalletActions();

  const [, actions] = useNotifications();

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTransaction = () => {
    // Handle the transaction logic here
    console.log('Transaction made to', address, 'of amount', amount);
    setOpen(false);
  };

  const handleLogout = () => {
    // Handle the logout logic here
    console.log('User logged out');
    logOut();
  };

  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);

  useEffect(() => {
    // Fetch latest blocks, transactions, and balance here
    getBalance(wallet.publicKey).then((balance) => {
      console.log('Balance:', balance);
      updateBalance(balance);
    });
    getLatestBlocks().then((blocks) => {
      console.log('Latest blocks:', blocks);
      setLatestBlocks(blocks);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!wallet.privateKey || !wallet.publicKey) {
    return <Navigate to="/wallet/access" />;
  }

  const transactions = [
    { date: '2024-06-01', type: 'Received', amount: 1.5 },
    { date: '2024-06-05', type: 'Sent', amount: 0.5 },
    { date: '2024-06-10', type: 'Received', amount: 2.0 },
  ];

  const transactionData = {
    labels: ['Received', 'Sent'],
    datasets: [
      {
        data: [3.5, 0.5], // Example data: 3.5 LCD received, 0.5 LCD sent
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

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
                <Typography color="textSecondary">Balance: {wallet.balance} LCD</Typography>
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
                  <Doughnut data={transactionData} />
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.amount} LCD</TableCell>
                      </TableRow>
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
    </>
  );
}

export default Dashboard;
