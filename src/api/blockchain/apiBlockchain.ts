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
