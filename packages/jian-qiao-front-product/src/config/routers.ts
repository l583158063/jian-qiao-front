import categoryManageRouterConfig from '../routes/category-manage/routers';
import { RoutersConfig } from 'hzero-boot/lib/typings/IRouterConfig';

const config: RoutersConfig = [
  // Insert New Router
  ...categoryManageRouterConfig,

  // product-sku
  {
    path: '/jian-qiao-front-product/product-sku',
    components: [
      {
        path: '/jian-qiao-front-product/product-sku/list',
        component: () => import('../routes/product-sku/list/ProductSkuListPage'),
      },
      {
        path: '/jian-qiao-front-product/product-sku/detail/:productSkuCode',
        component: () => import('../routes/product-sku/detail/ProductSkuDetailPage'),
      },
    ],
  },

  // product-spu
  {
    path: '/jian-qiao-front-product/product-spu',
    components: [
      {
        path: '/jian-qiao-front-product/product-spu/list',
        component: () => import('../routes/product-spu/list/ProductSpuListPage'),
      },
      {
        path: '/jian-qiao-front-product/product-spu/detail/:productSpuCode',
        component: () => import('../routes/product-spu/detail/ProductSpuDetailPage'),
      },
    ],
  },

];

export default config;
