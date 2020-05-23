import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  // Insert New Router
  {
    path: '/jian-qiao-front-order/order',
    components: [
      {
        path: '/jian-qiao-front-order/order/order-list',
        component: () => import('../routes/order/list/OrderListPage'),
      },
      {
        path: '/jian-qiao-front-order/order/order-detail/:orderCode',
        component: () => import('../routes/order/detail/OrderDetailPage'),
      },
    ],
  },
  {
    path: '/jian-qiao-front-order/consignment',
    components: [
      {
        path: '/jian-qiao-front-order/consignment/consignment-list',
        component: () => import('../routes/consignment/list/ConsignmentListPage'),
      },
      {
        path: '/jian-qiao-front-order/consignment/consignment-detail/:consignmentCode',
        component: () => import('../routes/consignment/detail/ConsignmentDetailPage'),
      },
    ],
  },
];

export default config;
