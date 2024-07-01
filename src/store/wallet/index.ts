import { atom } from 'recoil';
import { Wallet } from './type';
import { AtomEffectParams } from '../types';

const WalletState = atom<Wallet>({
  key: 'wallet',
  default: {
    privateKey: '',
    publicKey: '',
  },
  effects_UNSTABLE: [synchronizeWithLocalStorage],
});

function synchronizeWithLocalStorage({ setSelf, onSet }: AtomEffectParams) {
  const storedWallet = localStorage.getItem('wallet');
  storedWallet && setSelf(JSON.parse(storedWallet));
  onSet((value: Wallet) => localStorage.setItem('wallet', JSON.stringify(value)));
}

export default WalletState;
