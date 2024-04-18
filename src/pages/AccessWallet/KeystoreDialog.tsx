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
import { CenteredFlexBox } from '@/components/styled';
import { useRecoilState } from 'recoil';
import KeystoreState from '@/store/keystore';
import PasswordForm from './PasswordForm';
import keystoreFileImg from './assets/keystore-file.jpg';
import { Keystore } from '@/store/keystore/type';
import { useNavigate } from 'react-router-dom';

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
  const steps = ['Select File', 'Enter Password'];
  const muiTheme = useThemeMUI();
  const isMd = useMediaQuery(muiTheme.breakpoints.up('md'));
  const [activeStep, setActiveStep] = React.useState(0);
  const [, setKeystore] = useRecoilState(KeystoreState);
  const navigate = useNavigate();

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
            Access Wallet with Keystore File
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
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
              Enter Password
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 4 }}>
              Enter your password to unlock your wallet.
            </Typography>
            <PasswordForm
              onSuccessfulSubmit={() => {
                handleClose();
                navigate('/wallet/dashboard');
              }}
              setActiveStep={setActiveStep}
            />
          </Box>
        )}
        {activeStep === 0 && (
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
                flex: 3,
              }}
            >
              <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
                Select Your Keystore File
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 4 }}>
                Please select keystore file that unlocks your wallet.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.json';
                  input.onchange = (e) => {
                    const target = e.target as HTMLInputElement;
                    const file = target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const contents = e.target?.result;
                        if (contents) {
                          console.log(contents);
                          const value = JSON.parse(contents as string) as Keystore;
                          setKeystore(value);
                          setActiveStep(1);
                        }
                      };
                      reader.readAsText(file);
                    }
                  };
                  input.click();
                }}
                size="large"
                sx={{
                  borderRadius: '8px',
                  paddingY: 2,
                  paddingX: 4,
                  fontSize: 16,
                  marginBottom: 2,
                }}
              >
                Select File
              </Button>
            </Box>
            <CenteredFlexBox
              sx={{
                width: '100%',
                height: '100%',
                flex: 2,
              }}
            >
              <img src={keystoreFileImg} alt="keystore file" width={isMd ? '200px' : '150px'} />
            </CenteredFlexBox>
          </Box>
        )}
        <Alert severity="warning">
          <AlertTitle>NOT RECOMMENDED</AlertTitle>
          This information is sensitive, and these options should only be used in offline settings
          by experienced crypto users.
        </Alert>
      </Box>
    </Dialog>
  );
}
