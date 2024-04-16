import { generateQuestion } from '@/api/wallet/apiWallet';
import useNotifications from '@/store/notifications';
import useMnemonicPhrase from '@/store/phrase';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme as useThemeMUI,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface PhraseDialogProps {
  setActiveStep: (value: number) => void;
}

export default function PhraseVerification({ setActiveStep }: PhraseDialogProps) {
  const [phrases] = useMnemonicPhrase();
  const [pickedWords, setPickedWords] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Array<string[]>>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['', '', '']);
  const [, actions] = useNotifications();

  const handleOptionChange = (index: number, value: string) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Selected options:', selectedOptions);
    let isOk = true;
    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i] !== pickedWords[i]) {
        isOk = false;
        break;
      }
    }
    if (isOk) {
      setActiveStep(2);
    } else {
      actions.push({
        message: 'Wrong values selected. Please try again!',
        options: {
          variant: 'error',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        },
      });
    }
  };

  useEffect(() => {
    const pickedIndices: number[] = [];
    while (pickedIndices.length < 3) {
      const index = Math.floor(Math.random() * phrases.length);
      if (!pickedIndices.includes(index)) {
        pickedIndices.push(index);
      }
    }
    pickedIndices.sort((a, b) => a - b);
    const pickedWords = pickedIndices.map((index) => phrases[index]);
    setPickedWords(pickedWords);
    const questionPromises = pickedWords.map((word) => generateQuestion(word));
    Promise.all(questionPromises).then((questions) => {
      setQuestions(questions);
      for (let i = 0; i < questions.length; i++) {
        setSelectedOptions((prevOptions) => {
          const newOptions = [...prevOptions];
          newOptions[i] = questions[i][0];
          return newOptions;
        });
      }
    });
  }, [phrases]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {questions.map((question, index) => (
        <Question
          key={`question${index}`}
          selectIndex={index}
          index={phrases.indexOf(pickedWords[index])}
          words={question}
          selectedOption={selectedOptions[index]}
          onChange={handleOptionChange}
        />
      ))}
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
          size="medium"
          sx={{
            borderRadius: '8px',
            paddingY: 2,
            paddingX: 4,
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          size="medium"
          sx={{
            borderRadius: '8px',
            paddingY: 2,
            paddingX: 4,
          }}
        >
          Verify
        </Button>
      </Box>
    </Box>
  );
}

interface QuestionProps {
  selectIndex: number;
  index: number;
  words: string[];
  selectedOption: string;
  onChange: (selectIndex: number, value: string) => void;
}

function Question({ index, selectIndex, words, selectedOption, onChange }: QuestionProps) {
  const muiTheme = useThemeMUI();
  const isMd = useMediaQuery(muiTheme.breakpoints.up('md'));
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(selectIndex, event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderRadius: '8px',
        border: '1px solid #E0E0E0',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
        padding: '16px 24px',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          width: '50px',
        }}
      >
        {index + 1}.
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label={`${index + 1}.`}
          name={`question${index + 1}`}
          value={selectedOption}
          onChange={handleChange}
          sx={{
            display: 'flex',
            flexDirection: isMd ? 'row' : 'column',
            gap: isMd ? '0px' : '8px',
          }}
        >
          {words.map((word) => (
            <FormControlLabel
              key={word}
              value={word}
              control={<Radio />}
              label={word}
              sx={{
                width: '200px',
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
