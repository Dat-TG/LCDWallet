import React from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { useRecoilState } from 'recoil';
import WalletState from '@/store/wallet';

const Faucet: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement faucet submission logic here
    alert('LCD tokens will be sent to the provided address!');
  };

  const [wallet] = useRecoilState(WalletState);

  return (
    <Container
      sx={{
        paddingTop: '24px',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        fontWeight={'bold'}
        textAlign={'center'}
        color={'primary'}
      >
        LCD Faucet
      </Typography>
      <Typography variant="body1" gutterBottom textAlign={'center'} marginBottom={'16px'}>
        Obtain LCD tokens once every day
      </Typography>
      <Card
        sx={{
          padding: '16px',
          borderRadius: '16px',
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  required
                  id="address"
                  label="Enter Address"
                  variant="outlined"
                  defaultValue={wallet.publicKey}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    fontSize: '1rem',
                  }}
                >
                  SEND 100 LCD
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Faucet;
