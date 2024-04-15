import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, IconButton, InputAdornment, Button, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { accessWalletKeystore } from '@/api/wallet/apiWallet';
import { useRecoilState } from 'recoil';
import KeystoreState from '@/store/keystore';
import WalletState from '@/store/wallet';

type FormValues = {
  password: string;
};

interface CreatePasswordFormProps {
  onSuccessfulSubmit?: () => void;
  setActiveStep: (value: number) => void;
}

function PasswordForm({ onSuccessfulSubmit, setActiveStep }: CreatePasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch } = useForm<FormValues>({
    mode: 'all',
  });

  const password = watch('password');

  const [keystore] = useRecoilState(KeystoreState);
  const [, setWallet] = useRecoilState(WalletState);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    accessWalletKeystore({
      password: data.password,
      ...keystore,
    }).then((data) => {
      console.log(data);
      setWallet(data);
      onSuccessfulSubmit && onSuccessfulSubmit();
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TextField
        {...register('password')}
        label="Password"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          marginBottom: 3,
        }}
        fullWidth
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <Button
          type="button"
          onClick={() => {
            setActiveStep(0);
          }}
          variant="outlined"
          sx={{
            marginBottom: 4,
            paddingY: 2,
            paddingX: 4,
            fontSize: 16,
          }}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginBottom: 4,
            paddingY: 2,
            paddingX: 4,
            fontSize: 16,
          }}
          disabled={!password || password.length === 0}
        >
          Access Wallet
        </Button>
      </Box>
    </form>
  );
}

export default PasswordForm;
