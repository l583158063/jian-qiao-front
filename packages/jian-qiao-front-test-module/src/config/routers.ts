import testPageRouterConfig from '../routes/test-page/routers';
import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  // Insert New Router
  ...testPageRouterConfig,
  {
    path: '/jian-qiao-front-test-module/hello',
    component: () => import('../routes/hello/HelloTestModulePage'),
    authorized: true,
    title: 'Hello JianQiaoFrontTestModule',
  }
];

export default config;
