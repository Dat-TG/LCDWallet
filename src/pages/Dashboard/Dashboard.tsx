import WalletState from '@/store/wallet';
import { useRecoilState } from 'recoil';

function Dashboard() {
  const [wallet] = useRecoilState(WalletState);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Private Key: {wallet.privateKey}</p>
      <p>Public Key: {wallet.publicKey}</p>
    </div>
  );
}

export default Dashboard;
