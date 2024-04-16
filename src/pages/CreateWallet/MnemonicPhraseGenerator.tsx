import useMnemonicPhrase from '@/store/phrase';
import { Autorenew, Download } from '@mui/icons-material';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

export default function MnemonicPhraseGenerator() {
  const [mnemonic, actions] = useMnemonicPhrase();
  const theme = useTheme();
  const download = () => {
    const element = document.createElement('a');
    const file = new Blob([mnemonic.join(' ')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `mnemonic${new Date().getTime()}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant="contained" onClick={actions.generate} startIcon={<Autorenew />}>
          Update
        </Button>
        <Button variant="outlined" onClick={download} startIcon={<Download />}>
          Download
        </Button>
      </Box>
      <div>
        <Grid container spacing={2}>
          {mnemonic.map((word, index) => (
            <Grid key={index} item xs={3}>
              <Typography
                variant="body1"
                style={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  padding: '8px',
                  borderRadius: '4px',
                }}
              >
                <span
                  style={{
                    color: theme.palette.primary.main,
                  }}
                >
                  {index + 1}
                </span>
                {'. '}
                {word}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
}
