import ButtonWithDirection from '@/components/Button';
import Meta from '@/components/Meta';
import { CenteredFlexBox } from '@/components/styled';
import { Button, Typography } from '@mui/material';
import keystore from '../../assets/keystore.svg';
import phrase from '../../assets/phrase.svg';
import { useState } from 'react';
import KeystoreDialog from './KeystoreDialog';

function CreateWallet() {
  const [openKeystore, setOpenKeystore] = useState(false);
  return (
    <>
      <Meta title="Create A Crypto Wallet" />
      <CenteredFlexBox
        sx={{
          flexDirection: 'column',
          minHeight: '100%',
          padding: '2rem',
          textAlign: 'center',
          margin: 'auto',
        }}
      >
        <Typography variant="h3" fontWeight={'bold'} marginBottom={2}>
          Create A New Wallet
        </Typography>
        <Typography variant="body1">Please select a method to create a new wallet</Typography>
        <Typography variant="body1" marginBottom={4}>
          Already have a wallet?{' '}
          <Button variant="text" color="primary" LinkComponent={'a'} href="/wallet/access">
            Access my wallet
          </Button>
        </Typography>
        <ButtonWithDirection
          title="Keystore File"
          direction="Using a keystore file online makes your wallet more vulnerable to loss of funds. We don't recommend this method of wallet creation."
          image={keystore}
          onClick={() => setOpenKeystore(true)}
          sx={{
            marginBottom: 3,
          }}
        />

        <ButtonWithDirection
          title="Mnemonic Phrase"
          direction="Using a Mnemonic Phrase online makes your wallet more vulnerable to loss of funds. We don’t recommend this method of wallet creation."
          image={phrase}
          onClick={() => {}}
        />
      </CenteredFlexBox>
      <KeystoreDialog open={openKeystore} setOpen={setOpenKeystore} />
    </>
  );
}

export default CreateWallet;
