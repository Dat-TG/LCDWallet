import { useCallback, useMemo } from 'react';
import { atom, selector, useRecoilState } from 'recoil';
import type { Actions } from './types';
import { generateMnemonicPhrase } from '@/api/wallet/apiWallet';
import { AxiosError } from 'axios';
import useNotifications from '../notifications';

const phraseSelector = selector({
  key: 'phrase-selector',
  get: async () => {
    return (await generateMnemonicPhrase()).split(' ');
  },
});

const mnemonicPhraseState = atom<string[]>({
  key: 'mnemonic-phrase-state',
  default: phraseSelector,
});

function useMnemonicPhrase(): [string[], Actions] {
  const [phrase, setPhrase] = useRecoilState(mnemonicPhraseState);
  const [, actions] = useNotifications();

  const generate = useCallback(() => {
    generateMnemonicPhrase()
      .then((phrase: string) => {
        console.log(phrase);
        setPhrase(phrase.split(' '));
      })
      .catch((err: AxiosError) => {
        console.error(err);
        actions.push({
          message:
            (err?.response?.data as { error: string })?.error ||
            err.message ||
            'Something went wrong',
          options: {
            variant: 'error',
          },
        });
      });
  }, [actions, setPhrase]);

  const memoizedActions = useMemo(() => ({ generate }), [generate]);

  return [phrase, memoizedActions];
}

export default useMnemonicPhrase;
