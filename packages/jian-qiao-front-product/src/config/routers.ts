import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  // Insert New Router
  {
    path: '/jian-qiao-front-product/hello',
    component: () => import('../routes/hello/HelloProductPage'),
    authorized: true,
    title: 'Hello JianQiaoFrontProduct',
  }
];

export default config;
