import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Alert, AlertTitle, Box, useMediaQuery, useTheme as useThemeMUI } from '@mui/material';
import PhraseInput from './PhraseInput';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface KeystoreDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function PhraseDialog({ open, setOpen }: KeystoreDialogProps) {
  const handleClose = () => {
    setOpen(false);
  };
  const muiTheme = useThemeMUI();
  const isMd = useMediaQuery(muiTheme.breakpoints.up('md'));

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar
          sx={{
            display: 'flex',
          }}
        >
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
            }}
          >
            Access Wallet with Mnemonic Phrase
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '24px',
          padding: isMd ? '24px 48px' : '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 3,
          }}
        >
          <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
            Enter your Mnemonic Phrase
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            Please type the mnemonic phrase you wrote down in the right order.
          </Typography>
          <PhraseInput />
        </Box>
        <Alert severity="warning">
          <AlertTitle>NOT RECOMMENDED</AlertTitle>
          This information is sensitive, and these options should only be used in offline settings
          by experienced crypto users. You will need your keystore file + password to access your
          wallet. Please save them in a secure location. We CAN NOT retrieve or reset your
          keystore/password if you lose them.
        </Alert>
      </Box>
    </Dialog>
  );
}
