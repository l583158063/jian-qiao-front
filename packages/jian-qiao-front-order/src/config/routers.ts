import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  // Insert New Router
  {
    path: '/jian-qiao-front-order/hello',
    component: () => import('../routes/hello/HelloOrderPage'),
    authorized: true,
    title: 'Hello JianQiaoFrontOrder',
  }
];

export default config;
