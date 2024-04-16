import { atom } from 'recoil';
import { Keystore } from './type';

const KeystoreState = atom<Keystore>({
  key: 'keystoreState',
  default: {
    iv: '',
    salt: '',
    encryptedData: '',
  },
});

export default KeystoreState;
