import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  {
    path: '/jian-qiao-front-product/category-manage',
    component: () => import('./CategoryManagePage'),
    authorized: true,
    title: 'CategoryManage',
  }
];

export default config;
