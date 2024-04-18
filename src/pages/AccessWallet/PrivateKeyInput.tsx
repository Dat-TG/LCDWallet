import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, IconButton, InputAdornment, Button, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { accessWalletPrivateKey } from '@/api/wallet/apiWallet';
import { useRecoilState } from 'recoil';
import WalletState from '@/store/wallet';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  privateKey: string;
};

function PrivateKeyInput() {
  const [showPrivateKey, setShowPassword] = useState(false);
  const [, setWallet] = useRecoilState(WalletState);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    accessWalletPrivateKey(data.privateKey).then((publicKey: string) => {
      console.log(data);
      setWallet({
        privateKey: data.privateKey,
        publicKey: publicKey,
      });
      navigate('/wallet/dashboard');
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
