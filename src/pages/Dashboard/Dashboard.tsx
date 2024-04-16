import Meta from '@/components/Meta';
import WalletState from '@/store/wallet';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

function Dashboard() {
  const [wallet] = useRecoilState(WalletState);
  if (!wallet.privateKey || !wallet.publicKey) {
    return <Navigate to="/wallet/access" />;
  }
  return (
    <>
      <Meta title="Dashboard" />
      <div>
        <h1>Dashboard</h1>
        <p>Private Key: {wallet.privateKey}</p>
        <p>Public Key: {wallet.publicKey}</p>
      </div>
    </>
  );
}

export default Dashboard;
