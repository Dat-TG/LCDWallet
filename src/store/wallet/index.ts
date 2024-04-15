import { atom } from 'recoil';
import { Wallet } from './type';

const WalletState = atom<Wallet>({
  key: 'wallet',
  default: {
    privateKey: '',
    publicKey: '',
  },
});

export default WalletState;
