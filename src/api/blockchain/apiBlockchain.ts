import AxiosClient from '../client';
import { Block } from './type';

export const getLatestBlocks = async () => {
  const response = await AxiosClient.get('/blocks/latest');
  return response.data as Block[];
};
