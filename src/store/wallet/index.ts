import { atom, useSetRecoilState } from 'recoil';
import { Wallet } from './type';
import { AtomEffectParams } from '../types';

const WalletState = atom<Wallet>({
  key: 'wallet',
  default: {
    privateKey: '',
    publicKey: '',
    balance: 1,
  },
  effects_UNSTABLE: [synchronizeWithLocalStorage],
});

function synchronizeWithLocalStorage({ setSelf, onSet }: AtomEffectParams) {
  const storedWallet = localStorage.getItem('wallet');
  storedWallet && setSelf(JSON.parse(storedWallet));
  onSet((value: Wallet) => localStorage.setItem('wallet', JSON.stringify(value)));
}

export const useWalletActions = () => {
  const setWalletState = useSetRecoilState(WalletState);

  const logOut = () => {
    setWalletState({ privateKey: '', publicKey: '', balance: 0 });
    localStorage.removeItem('wallet');
  };

  const updateBalance = (balance: number) => {
    setWalletState((prev) => ({ ...prev, balance }));
  };

  return { logOut, updateBalance };
};

export default WalletState;
