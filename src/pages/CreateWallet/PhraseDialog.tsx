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
import iconKeystore from './assets/icon-keystore.png';
import { CenteredFlexBox } from '@/components/styled';
import { useNavigate } from 'react-router-dom';
import MnemonicPhraseGenerator from './MnemonicPhraseGenerator';
import PhraseVerification from './PhraseVerification';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PhraseDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function PhraseDialog({ open, setOpen }: PhraseDialogProps) {
  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };
  const steps = ['Write down the words', 'Verification', 'Well done'];
  const muiTheme = useThemeMUI();
  const isMd = useMediaQuery(muiTheme.breakpoints.up('md'));
  const [activeStep, setActiveStep] = React.useState(0);

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
            Create Wallet with Mnemonic Phrase
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
        {activeStep === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="body1" sx={{ marginTop: 4 }}>
              Write down these words
            </Typography>
            <MnemonicPhraseGenerator />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveStep(1)}
              size="medium"
              sx={{
                borderRadius: '8px',
                paddingY: 2,
                paddingX: 4,
                marginY: 4,
                marginX: 'auto',
              }}
            >
              I wrote them down
            </Button>
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <Typography variant="body1" sx={{ marginY: 4 }}>
              Please select correct words based on their numbers.
            </Typography>
            <PhraseVerification setActiveStep={setActiveStep} />
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
                onClick={() => {
                  handleClose();
                  navigate('/wallet/access');
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
