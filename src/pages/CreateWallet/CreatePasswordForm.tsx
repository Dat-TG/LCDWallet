import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createWalletKeystore } from '@/api/wallet/apiWallet';
import { useRecoilState } from 'recoil';
import KeystoreState from '@/store/keystore';

type FormValues = {
  password: string;
  confirmPassword: string;
};

interface CreatePasswordFormProps {
  onSuccessfulSubmit: () => void;
}

function CreatePasswordForm({ onSuccessfulSubmit }: CreatePasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setKeystore] = useRecoilState(KeystoreState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    mode: 'all',
  });
  const password = watch('password');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    createWalletKeystore({ password: 'password' }).then((response) => {
      console.log(response);
      setKeystore({
        iv: response.iv,
        encryptedData: response.encryptedData,
      });
    });
    onSuccessfulSubmit();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
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
        {...register('password', {
          required: 'Required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
        label="Password"
        type={showPassword ? 'text' : 'password'}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
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
      <TextField
        {...register('confirmPassword', {
          required: 'Required',
          validate: (value) => value === password || 'The passwords do not match',
        })}
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          marginBottom: 4,
        }}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          marginBottom: 4,
          paddingY: 2,
          paddingX: 4,
          fontSize: 16,
        }}
      >
        Create Wallet
      </Button>
    </form>
  );
}

export default CreatePasswordForm;
