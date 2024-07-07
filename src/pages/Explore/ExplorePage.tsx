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

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: string;
}

interface MiningStats {
  totalBlocks: number;
  totalRewards: number;
  hashRate: number;
}

const fetchTransactionPool = async (): Promise<Transaction[]> => {
  // Simulate fetching transaction pool data
  return [
    { id: '1', from: 'Alice', to: 'Bob', amount: 50, timestamp: '2024-07-01T12:00:00Z' },
    { id: '2', from: 'Charlie', to: 'Dave', amount: 30, timestamp: '2024-07-01T12:05:00Z' },
    // Add more transactions as needed
  ];
};

const fetchMiningStats = async (): Promise<MiningStats> => {
  // Simulate fetching mining statistics
  return {
    totalBlocks: 1200,
    totalRewards: 15000,
    hashRate: 3000,
  };
};

const ExplorePage: React.FC = () => {
  const [transactionPool, setTransactionPool] = useState<Transaction[]>([]);
  const [miningStats, setMiningStats] = useState<MiningStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await fetchTransactionPool();
      setTransactionPool(transactions);
      const stats = await fetchMiningStats();
      setMiningStats(stats);
    };
    fetchData();
  }, []);

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
                      Total Blocks Mined: {miningStats.totalBlocks}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Total Rewards Earned: {miningStats.totalRewards} LCD
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Hash Rate: {miningStats.hashRate} H/s
                    </Typography>
                    <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
                      Start Mining
                    </Button>
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
    </>
  );
};

export default ExplorePage;
