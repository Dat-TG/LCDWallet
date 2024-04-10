import { Button, Typography, useMediaQuery, useTheme as useThemeMUI } from '@mui/material';
import { Box } from '@mui/system';

interface ButtonWithDirectionProps {
  title: string;
  direction?: string;
  image: string;
  onClick: () => void;
  sx?: object;
}

function ButtonWithDirection({ title, direction, image, onClick, sx }: ButtonWithDirectionProps) {
  const muiTheme = useThemeMUI();
  const isMd = useMediaQuery(muiTheme.breakpoints.up('md'));
  return (
    <Button
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMd ? '36px 36px' : '24px 24px',
        borderRadius: '16px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '800px',
        gap: isMd ? '48px' : '16px',
        ...sx,
      }}
      variant="contained"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Typography variant={isMd ? 'h5' : 'h6'} fontWeight={'bold'} textAlign={'left'}>
          {title}
        </Typography>
        {direction && (
          <Typography variant={isMd ? 'body1' : 'body2'} textAlign={'left'}>
            {direction}
          </Typography>
        )}
      </Box>
      <img src={image} alt="Button Image" width={'64px'} />
    </Button>
  );
}

export default ButtonWithDirection;
