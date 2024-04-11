import { Typography, useMediaQuery, useTheme as useThemeMUI } from '@mui/material';
import { Box } from '@mui/system';

interface DownloadDirectionProps {
  title: string;
  direction: string;
  image: string;
  sx?: object;
}

function DownloadDirection({ title, direction, image, sx }: DownloadDirectionProps) {
  const muiTheme = useThemeMUI();
  const isMd = useMediaQuery(muiTheme.breakpoints.up('md'));
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        border: `1px solid ${muiTheme.palette.primary.main}`,
        padding: '16px',
        borderRadius: '16px',
        ...sx,
      }}
    >
      <img src={image} alt={title} width={isMd ? '80px' : '60px'} />
      <Typography variant="h6" fontWeight={'bold'} textAlign={'center'}>
        {title}
      </Typography>
      <Typography variant="body1" textAlign={'center'}>
        {direction}
      </Typography>
    </Box>
  );
}

export default DownloadDirection;
