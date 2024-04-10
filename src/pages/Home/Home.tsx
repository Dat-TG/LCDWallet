import Meta from '@/components/Meta';
import { CenteredFlexBox } from '@/components/styled';
import { Button, Typography, useMediaQuery, useTheme as useThemeMUI } from '@mui/material';
import peggy from './assets/peggy.svg';
import { useNavigate } from 'react-router-dom';
function Home() {
  const muiTheme = useThemeMUI();
  const isMd = useMediaQuery(muiTheme.breakpoints.up('md'));
  const isSm = useMediaQuery(muiTheme.breakpoints.up('sm'));
  const navigate = useNavigate();
  return (
    <>
      <Meta title="Home" />
      <CenteredFlexBox
        style={{
          flexDirection: 'column',
          gap: isMd ? '1.5rem' : '1rem',
          height: '100%',
          padding: isMd ? '2rem' : '1rem',
        }}
      >
        <Typography variant={isMd ? 'h3' : 'h5'} color={'primary'} fontWeight={'bold'}>
          LCDWallet
        </Typography>
        <Typography variant={isMd ? 'h2' : 'h4'} fontWeight={'bold'} textAlign={'center'}>
          The most reputable, friendly, {isSm && <br></br>}and secure crypto wallet.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size={isMd ? 'large' : 'small'}
          sx={{
            borderRadius: '1rem',
            fontSize: isMd ? '1.25rem' : '0.8rem',
            padding: isMd ? '0.8rem 2rem' : '0.5rem 1rem',
          }}
          onClick={() => {
            navigate('/wallet/create');
          }}
        >
          Create a new wallet
        </Button>
        <Typography variant="body1" textAlign={'center'}>
          Already have a wallet?{isMd ? ' ' : <br></br>}
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              navigate('/wallet/access');
            }}
          >
            Access my wallet
          </Button>
        </Typography>
        <img
          src={peggy}
          alt="Peggy"
          style={{
            width: isMd ? '100%' : '50%',
            maxWidth: isMd ? '350px' : '150px',
            height: 'auto',
            position: 'absolute',
            bottom: '0',
            left: '0',
            transform: isMd ? 'translate(0%, -10%)' : 'translate(0%, -100%)',
          }}
        />
      </CenteredFlexBox>
    </>
  );
}
export default Home;
