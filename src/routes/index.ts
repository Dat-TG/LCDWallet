import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';
import { WalletOutlined } from '@mui/icons-material';

const routes: Routes = {
  [Pages.Home]: {
    component: asyncComponentLoader(() => import('@/pages/Home')),
    path: '/',
    icon: HomeIcon,
    id: 'home',
  },
  [Pages.CreateWallet]: {
    component: asyncComponentLoader(() => import('@/pages/CreateWallet')),
    path: '/wallet/create',
    title: 'Create wallet',
    icon: WalletOutlined,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
