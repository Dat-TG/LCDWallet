import ButtonWithDirection from '@/components/Button';
import Meta from '@/components/Meta';
import { CenteredFlexBox } from '@/components/styled';
import { Button, Typography } from '@mui/material';
import keystore from '../../assets/keystore.svg';
import phrase from '../../assets/phrase.svg';
import privateKey from '../../assets/privateKey.png';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import KeystoreDialog from './KeystoreDialog';
import PhraseDialog from './PhraseDialog';
import PrivateKeyDialog from './PrivateKeyDialog';

function AccessWallet() {
  const navigate = useNavigate();
  const [openKeystoreDialog, setOpenKeystoreDialog] = React.useState(false);
  const [openPhraseDialog, setOpenPhraseDialog] = React.useState(false);
  const [openPrivateKeyDialog, setOpenPrivateKeyDialog] = React.useState(false);
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
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              navigate('/wallet/create');
            }}
          >
            Create wallet
          </Button>
        </Typography>
        <ButtonWithDirection
          title="Keystore File"
          image={keystore}
          onClick={() => setOpenKeystoreDialog(true)}
          sx={{
            marginBottom: 3,
          }}
        />

        <ButtonWithDirection
          title="Mnemonic Phrase"
          image={phrase}
          onClick={() => setOpenPhraseDialog(true)}
          sx={{
            marginBottom: 3,
          }}
        />

        <ButtonWithDirection
          title="Private Key"
          image={privateKey}
          onClick={() => setOpenPrivateKeyDialog(true)}
        />
      </CenteredFlexBox>
      <KeystoreDialog open={openKeystoreDialog} setOpen={setOpenKeystoreDialog} />
      <PhraseDialog open={openPhraseDialog} setOpen={setOpenPhraseDialog} />
      <PrivateKeyDialog open={openPrivateKeyDialog} setOpen={setOpenPrivateKeyDialog} />
    </>
  );
}

export default AccessWallet;
