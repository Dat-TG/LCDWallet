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

export const generateQuestion = async (word: string) => {
  const response = await AxiosClient.get(`/wallet/generate/question?word=${word}`);
  return response.data.question as string[];
};

export const accessWalletMnemonic = async (mnemonic: string) => {
  const response = await AxiosClient.post('/wallet/access/mnemonic', { mnemonic });
  return response.data as Wallet;
};

export const accessWalletPrivateKey = async (privateKey: string) => {
  const response = await AxiosClient.post('/wallet/access/privatekey', { privateKey });
  return response.data.publicKey as string;
};

export const getBalance = async (address: string) => {
  const response = await AxiosClient.get(`/wallet/balance?address=${address}`);
  return response.data.balance as number;
};
