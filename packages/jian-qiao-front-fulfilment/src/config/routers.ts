import contractManageRouterConfig from '../routes/contract-manage/routers';
import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  // Insert New Router

  ...contractManageRouterConfig,

  {
    path: '/jian-qiao-front-fulfilment/refund-order',
    components: [
      {
        path: '/jian-qiao-front-fulfilment/refund-order/refund-order-list',
        component: () => import('../routes/refund-order/list/RefundOrderListPage'),
      },
      {
        path: '/jian-qiao-front-fulfilment/refund-order/refund-order-detail',
        component: () => import('../routes/refund-order/detail/RefundOrderDetailPage'),
      },
    ],
  },  
];

export default config;
