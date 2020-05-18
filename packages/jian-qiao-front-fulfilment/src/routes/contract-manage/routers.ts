import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  {
    path: '/jian-qiao-front-fulfilment/contract-manage',
    component: () => import('./ContractManagePage'),
  }
];

export default config;
