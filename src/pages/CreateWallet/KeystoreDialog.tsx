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
  Button,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme as useThemeMUI,
} from '@mui/material';
import CreatePasswordForm from './CreatePasswordForm';
import paperPlane from './assets/paper-plane.svg';
import copy from './assets/copy.svg';
import thief from './assets/thief.svg';
import DownloadDirection from './DownloadDirection';
import iconKeystore from './assets/icon-keystore.png';
import { CenteredFlexBox } from '@/components/styled';
import { useRecoilState } from 'recoil';
import KeystoreState from '@/store/keystore';

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
  const downloadDirections = [
    {
      title: "Don't lose it",
      direction: 'Be careful, it can not be recovered if you lose it.',
      image: paperPlane,
    },
    {
      title: "Don't share it",
      direction: 'Your funds will be stolen if you use this file on a malicious phishing site.',
      image: thief,
    },
    {
      title: 'Make a backup',
      direction: 'Secure it like the millions of dollars it may one day be worth.',
      image: copy,
    },
  ];
  const [keystore] = useRecoilState(KeystoreState);

  const downloadKeystoreFile = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(keystore)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `keystore${new Date().getTime()}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

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
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <Typography variant="body1" sx={{ marginY: 4 }}>
              Important things to know before downloading your keystore file.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '2rem',
                marginBottom: 4,
              }}
            >
              {downloadDirections.map((direction, index) => (
                <DownloadDirection
                  key={index}
                  {...direction}
                  sx={{
                    flex: 1,
                  }}
                />
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: 4,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setActiveStep(0)}
                size="large"
                sx={{
                  borderRadius: '8px',
                  paddingY: 2,
                  paddingX: 4,
                  fontSize: 16,
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  downloadKeystoreFile();
                  setActiveStep(2);
                }}
                size="large"
                sx={{
                  borderRadius: '8px',
                  paddingY: 2,
                  paddingX: 4,
                  fontSize: 16,
                }}
              >
                Acknowledge & Download
              </Button>
            </Box>
          </Box>
        )}
        {activeStep === 2 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMd ? 'row' : 'column',
              justifyContent: 'space-between',
              gap: '24px',
              padding: '24px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
                You are done!
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 4 }}>
                You are now ready to take advantage of all that Ethereum has to offer! Access with
                keystore file should only be used in an offline setting.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
                size="large"
                sx={{
                  borderRadius: '8px',
                  paddingY: 2,
                  paddingX: 4,
                  fontSize: 16,
                  marginBottom: 2,
                }}
              >
                Access Wallet
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}
                size="large"
                sx={{
                  borderRadius: '8px',
                  paddingY: 2,
                  paddingX: 4,
                  fontSize: 16,
                  marginBottom: 4,
                }}
              >
                Create Another Wallet
              </Button>
            </Box>
            <CenteredFlexBox
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <img src={iconKeystore} alt="icon-keystore" width={isMd ? '200px' : '150px'} />
            </CenteredFlexBox>
          </Box>
        )}
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
