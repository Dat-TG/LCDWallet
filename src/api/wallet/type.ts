interface CreateWalletKeystoreRequest {
  password: string;
}

interface AccessWalletKeystoreRequest {
  iv: string;
  salt: string;
  encryptedData: string;
  password: string;
}

export type { CreateWalletKeystoreRequest, AccessWalletKeystoreRequest };
