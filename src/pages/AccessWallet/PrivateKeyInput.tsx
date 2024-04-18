import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, IconButton, InputAdornment, Button, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type FormValues = {
  privateKey: string;
};

function PrivateKeyInput() {
  const [showPrivateKey, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
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
        {...register('privateKey', {
          required: 'Required',
        })}
        label="Private Key"
        type={showPrivateKey ? 'text' : 'password'}
        error={Boolean(errors.privateKey)}
        helperText={errors.privateKey?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility}>
                {showPrivateKey ? <VisibilityOff /> : <Visibility />}
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
          type="submit"
          variant="contained"
          sx={{
            marginBottom: 4,
            paddingY: 2,
            paddingX: 4,
            fontSize: 16,
          }}
        >
          Access Wallet
        </Button>
      </Box>
    </form>
  );
}

export default PrivateKeyInput;
