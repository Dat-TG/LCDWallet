import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import Meta from '@/components/Meta';
import {
  getMiningStats,
  getTransactionPool,
  isValidatorRegistered,
  registerValidator,
} from '@/api/blockchain/apiBlockchain';
import { useRecoilState } from 'recoil';
import WalletState from '@/store/wallet';
import useNotifications from '@/store/notifications';
import ValidatorRegisterModal from './ValidatorRegisterForm';
import { Navigate } from 'react-router-dom';
import { TransactionDetails } from '@/api/wallet/type';

interface MiningStats {
  minedBlocks: number;
  rewards: number;
}

const fetchTransactionPool = async (): Promise<TransactionDetails[]> => {
  const transactions = await getTransactionPool();
  return transactions;
};

const fetchMiningStats = async (address: string): Promise<MiningStats> => {
  const stats = await getMiningStats(address);
  return stats;
};

const ExplorePage: React.FC = () => {
  const [transactionPool, setTransactionPool] = useState<TransactionDetails[]>([]);
  const [miningStats, setMiningStats] = useState<MiningStats | null>(null);
  const [stake, setStake] = useState<number>(0);
  const [wallet] = useRecoilState(WalletState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [, actions] = useNotifications();
  const handleClose = () => setIsModalOpen(false);
  const handleRegister = (value: number) => {
    registerValidator(wallet.privateKey, value)
      .then((data) => {
        actions.push({ message: data.message, options: { variant: 'success' } });
        setStake(data.stake);
        console.log('Registered as validator with stake:', data.stake);
      })
      .catch((error) => {
        actions.push({ message: error.message, options: { variant: 'error' } });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await fetchTransactionPool();
      setTransactionPool(transactions);
      const stats = await fetchMiningStats(wallet.publicKey);
      setMiningStats(stats);
    };
    fetchData();
  }, [wallet.publicKey]);

  useEffect(() => {
    isValidatorRegistered(wallet.privateKey).then((stake) => {
      setStake(stake);
    });
  }, [wallet.privateKey]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'TRANSACTION_POOL':
          setTransactionPool(message.transactionPool);
          break;
        case 'MINING_STATS':
          if (message.address === wallet.publicKey) {
            setMiningStats(message.miningStats);
          }
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    };
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
    return () => ws.close();
  }, [wallet.publicKey]);

  if (!wallet.privateKey || !wallet.publicKey) {
    return <Navigate to="/wallet/access" />;
  }

  return (
    <>
      <Meta title="Explore" />
      <Container
        sx={{
          padding: '24px',
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight={'bold'}>
          Explore Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Validator Status
                </Typography>
                {stake > 0 ? (
                  <>
                    <Typography variant="body2" color="textSecondary" component="p">
                      You are a registered validator with a stake of {stake} LCD.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: 16 }}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Change Stake
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" color="textSecondary" component="p">
                      You are not a registered validator.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: 16 }}
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    >
                      Register as Validator
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Transaction Pool
                </Typography>
                <List>
                  {transactionPool.length > 0 ? (
                    transactionPool.map((transaction) => (
                      <ListItem
                        key={transaction.id}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          padding: 2,
                          margin: 1,
                          border: '1px solid #ccc',
                          borderRadius: 4,
                        }}
                      >
                        <ListItemText
                          primary={`From: ${transaction.fromAddress}`}
                          sx={{
                            wordWrap: 'break-word',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        />
                        <ListItemText
                          primary={`To: ${transaction.toAddress}`}
                          sx={{
                            wordWrap: 'break-word',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        />
                        <ListItemText primary={`Amount: ${transaction.amount} LCD`} />
                        <ListItemText
                          primary={`Time: ${new Date(transaction.timestamp).toLocaleString()}`}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary" component="p">
                      No transactions in the pool.
                    </Typography>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Mining Statistics
                </Typography>
                {miningStats ? (
                  <>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Total Blocks Mined: {miningStats.minedBlocks}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Total Rewards Earned: {miningStats.rewards} LCD
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2" color="textSecondary" component="p">
                    Loading mining statistics...
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <ValidatorRegisterModal
        open={isModalOpen}
        handleClose={handleClose}
        privateKey={wallet.privateKey}
        stake={stake}
        handleRegister={handleRegister}
      />
    </>
  );
};

export default ExplorePage;
