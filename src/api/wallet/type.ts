interface CreateWalletKeystoreRequest {
  password: string;
}

interface AccessWalletKeystoreRequest {
  iv: string;
  salt: string;
  encryptedData: string;
  password: string;
}

// Define the TransactionDetails type
interface TransactionDetails {
  status: string;
  id: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  timestamp: number;
}

export type { CreateWalletKeystoreRequest, AccessWalletKeystoreRequest, TransactionDetails };
