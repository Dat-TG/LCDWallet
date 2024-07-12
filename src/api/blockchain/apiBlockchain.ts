import AxiosClient from '../client';
import { Block } from './type';

export const getLatestBlocks = async () => {
  const response = await AxiosClient.get('/blocks/latest');
  return response.data as Block[];
};

export const requestFaucet = async (address: string) => {
  const response = await AxiosClient.post('/faucet', { address });
  return response.data.message as string;
};

export const registerValidator = async (publicKey: string, stake: number) => {
  const response = await AxiosClient.post('/blocks/register', { publicKey, stake });
  return response.data as {
    stake: number;
    message: string;
  };
};

export const isValidatorRegistered = async (publicKey: string) => {
  const response = await AxiosClient.get(`/blocks/registered/${publicKey}`);
  return response.data.stake as number;
};
