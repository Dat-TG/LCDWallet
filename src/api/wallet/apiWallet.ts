import { Keystore } from '@/store/keystore/type';
import AxiosClient from '../client';
import { AccessWalletKeystoreRequest, CreateWalletKeystoreRequest } from './type';
import { Wallet } from '@/store/wallet/type';

export const createWalletKeystore = async (data: CreateWalletKeystoreRequest) => {
  const response = await AxiosClient.post('/wallet/create/keystore', data);
  return response.data as Keystore;
};

export const accessWalletKeystore = async (data: AccessWalletKeystoreRequest) => {
  const response = await AxiosClient.post('/wallet/access/keystore', data);
  return response.data as Wallet;
};

export const generateMnemonicPhrase = async () => {
  const response = await AxiosClient.get('/wallet/generate/mnemonic');
  return response.data.mnemonic as string;
};
