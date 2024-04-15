import { atom } from 'recoil';
import { Keystore } from './type';

const KeystoreState = atom<Keystore>({
  key: 'keystore',
  default: {
    iv: '',
    salt: '',
    encryptedData: '',
  },
});

export default KeystoreState;
