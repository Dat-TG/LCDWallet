import ButtonWithDirection from '@/components/Button';
import Meta from '@/components/Meta';
import { CenteredFlexBox } from '@/components/styled';
import { Button, Typography } from '@mui/material';
import keystore from '../../assets/keystore.svg';
import phrase from '../../assets/phrase.svg';
import privateKey from '../../assets/privateKey.png';

function AccessWallet() {
  return (
    <>
      <Meta title="Access Your Crypto Wallet on LCDWallet" />
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
          Access My Wallet
        </Typography>
        <Typography variant="body1">Please select a method to access your wallet.</Typography>
        <Typography variant="body1" marginBottom={4}>
          Don&apos;t have a wallet?{' '}
          <Button variant="text" color="primary" LinkComponent={'a'} href="/wallet/create">
            Create wallet
          </Button>
        </Typography>
        <ButtonWithDirection
          title="Keystore File"
          image={keystore}
          onClick={() => {}}
          sx={{
            marginBottom: 3,
          }}
        />

        <ButtonWithDirection
          title="Mnemonic Phrase"
          image={phrase}
          onClick={() => {}}
          sx={{
            marginBottom: 3,
          }}
        />

        <ButtonWithDirection title="Private Key" image={privateKey} onClick={() => {}} />
      </CenteredFlexBox>
    </>
  );
}

export default AccessWallet;
