import { Keystore } from '@/store/keystore/type';
import AxiosClient from '../client';
import { CreateWalletKeystoreRequest } from './type';

export const createWalletKeystore = async (
  data: CreateWalletKeystoreRequest,
) /*: Promise<CreateWalletKeystoreResponse>*/ => {
  const response = await AxiosClient.post('/wallet/create/keystore', data);
  return response.data as Keystore;
};
