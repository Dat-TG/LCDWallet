import AxiosClient from '../client';
import { TransactionDetails } from '../wallet/type';
import { Block } from './type';

export const getLatestBlocks = async () => {
  const response = await AxiosClient.get('/blocks/latest');
  return response.data as Block[];
};

export const requestFaucet = async (address: string) => {
  const response = await AxiosClient.post('/faucet', { address });
  return response.data.message as string;
};

export const registerValidator = async (privateKey: string, stake: number) => {
  const response = await AxiosClient.post('/blocks/register', { privateKey, stake });
  return response.data as {
    stake: number;
    message: string;
  };
};

export const isValidatorRegistered = async (privateKey: string) => {
  const response = await AxiosClient.get(`/blocks/registered/${privateKey}`);
  return response.data.stake as number;
};

export const getMiningStats = async (address: string) => {
  const response = await AxiosClient.get(`/blocks/mining-stats/${address}`);
  return response.data as {
    minedBlocks: number;
    rewards: number;
  };
};

export const getTransactionPool = async () => {
  const response = await AxiosClient.get('/transactions/pool');
  return response.data as TransactionDetails[];
};
