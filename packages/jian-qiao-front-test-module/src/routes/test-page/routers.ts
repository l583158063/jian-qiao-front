import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  {
    path: '/jian-qiao-front-test-module/test-page',
    component: () => import('./TestPagePage'),
    authorized: true,
    title: 'Hello-TestPage',
  }
];

export default config;
