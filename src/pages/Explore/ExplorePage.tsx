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
  isValidatorRegistered,
  registerValidator,
} from '@/api/blockchain/apiBlockchain';
import { useRecoilState } from 'recoil';
import WalletState from '@/store/wallet';
import useNotifications from '@/store/notifications';
import ValidatorRegisterModal from './ValidatorRegisterForm';
import { Navigate } from 'react-router-dom';

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: string;
}

interface MiningStats {
  minedBlocks: number;
  rewards: number;
}

const fetchTransactionPool = async (): Promise<Transaction[]> => {
  // Simulate fetching transaction pool data
  return [
    { id: '1', from: 'Alice', to: 'Bob', amount: 50, timestamp: '2024-07-01T12:00:00Z' },
    { id: '2', from: 'Charlie', to: 'Dave', amount: 30, timestamp: '2024-07-01T12:05:00Z' },
    // Add more transactions as needed
  ];
};

const fetchMiningStats = async (address: string): Promise<MiningStats> => {
  const stats = await getMiningStats(address);
  return stats;
};

const ExplorePage: React.FC = () => {
  const [transactionPool, setTransactionPool] = useState<Transaction[]>([]);
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
                  {transactionPool.map((transaction) => (
                    <ListItem key={transaction.id}>
                      <ListItemText
                        primary={`From: ${transaction.from} To: ${transaction.to} Amount: ${transaction.amount}`}
                        secondary={`Timestamp: ${new Date(transaction.timestamp).toLocaleString()}`}
                      />
                    </ListItem>
                  ))}
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
