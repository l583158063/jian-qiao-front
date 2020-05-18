import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  // Insert New Router
  {
    path: '/jian-qiao-front-fulfilment/hello',
    component: () => import('../routes/hello/HelloFulfilmentPage'),
    authorized: true,
    title: 'Hello JianQiaoFrontFulfilment',
  }
];

export default config;
