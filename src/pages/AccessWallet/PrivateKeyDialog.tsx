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
import PrivateKeyInput from './PrivateKeyInput';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PrivateKeyDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function PrivateKeyDialog({ open, setOpen }: PrivateKeyDialogProps) {
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
            Access Wallet with Private Key
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          marginY: isMd ? 4 : 2,
          marginX: 'auto',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '800px',
          padding: isMd ? '24px' : '16px',
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} marginBottom={4}>
          Enter your private key
        </Typography>
        <PrivateKeyInput />
        <Alert severity="warning">
          <AlertTitle>NOT RECOMMENDED</AlertTitle>
          This information is sensitive, and these options should only be used in offline settings
          by experienced crypto users.
        </Alert>
      </Box>
    </Dialog>
  );
}
