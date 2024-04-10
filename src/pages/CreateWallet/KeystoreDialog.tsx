import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
  Alert,
  AlertTitle,
  Box,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme as useThemeMUI,
} from '@mui/material';
import CreatePasswordForm from './CreatePasswordForm';

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

export default function KeystoreDialog({ open, setOpen }: KeystoreDialogProps) {
  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };
  const steps = ['Create password', 'Download Keystore File', 'Well done'];
  const muiTheme = useThemeMUI();
  const isMd = useMediaQuery(muiTheme.breakpoints.up('md'));
  const [activeStep, setActiveStep] = React.useState(0);

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
            Create Wallet with Keystore File
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
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <Box>
            <Typography variant="body1" sx={{ marginY: 4 }}>
              Create a password to encrypt your keystore file.
            </Typography>
            <CreatePasswordForm onSuccessfulSubmit={() => setActiveStep(1)} />
            <Alert severity="warning">
              <AlertTitle>NOT RECOMMENDED</AlertTitle>
              This information is sensitive, and these options should only be used in offline
              settings by experienced crypto users. You will need your keystore file + password to
              access your wallet. Please save them in a secure location. We CAN NOT retrieve or
              reset your keystore/password if you lose them.
            </Alert>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
