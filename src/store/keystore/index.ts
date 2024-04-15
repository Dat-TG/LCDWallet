import { atom } from 'recoil';
import { Keystore } from './type';

const KeystoreState = atom<Keystore>({
  key: 'keystore',
  default: {
    iv: '',
    encryptedData: '',
  },
});

export default KeystoreState;
