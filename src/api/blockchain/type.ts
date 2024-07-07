interface Block {
  index: number;
  hash: string;
  previousHash: string;
  timestamp: number;
  transactions: Transaction[];
  validator: string;
  signature: string;
}

interface Transaction {
  id: string;
  txIns: TxIn[];
  txOuts: TxOut[];
}

interface TxIn {
  signature: string;
  txOutId: string;
  txOutIndex: number;
}

interface TxOut {
  address: string;
  amount: number;
}

export type { Block, Transaction, TxIn, TxOut };
