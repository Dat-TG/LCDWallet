import { Grid, Typography, TextField, Box, Button } from '@mui/material';
import { useState } from 'react';

export default function PhraseInput() {
  const [inputValues, setInputValues] = useState<string[]>(Array(12).fill(''));

  const handlePaste = (index: number, event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text').trim();
    const words = pastedText.split(' ');
    if (words.length == 12) {
      setInputValues(words);
    } else if (words.length == 1) {
      setInputValues((prevValues: string[]) => {
        const newValues = [...prevValues];
        newValues[index] = words[0];
        return newValues;
      });
    } else if (words.length < 12) {
      setInputValues((prevValues: string[]) => {
        const newValues = [...prevValues];
        for (let i = 0; i < words.length && index + i < 12; i++) {
          newValues[index + i] = words[i];
        }
        return newValues;
      });
    }
  };

  const handleClear = () => {
    setInputValues(Array(12).fill(''));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={4}>
        {inputValues.map((value: string, index: number) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Typography>{index + 1}.</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={value}
              InputLabelProps={{ shrink: false }}
              onPaste={(event) => handlePaste(index, event)}
              onChange={(event) => {
                const newValue = event.target.value;
                setInputValues((prevValues) => {
                  const newValues = [...prevValues];
                  newValues[index] = newValue;
                  return newValues;
                });
              }}
            />
          </Grid>
        ))}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            type="button"
            size="medium"
            sx={{
              borderRadius: '8px',
              paddingY: 2,
              paddingX: 4,
              marginY: 4,
            }}
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="medium"
            sx={{
              borderRadius: '8px',
              paddingY: 2,
              paddingX: 4,
              marginY: 4,
            }}
          >
            Access Wallet
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
