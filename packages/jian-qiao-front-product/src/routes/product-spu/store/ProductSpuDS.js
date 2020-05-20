import commonConfig from '@common/config/commonConfig';

export default () => ({
  transport: {
    read: config => {
      const url = `${commonConfig.HJQG_BACKEND}/v1/product-spus`;
      const axiosConfig = {
        ...config,
        url,
        method: 'GET',
      };
      return axiosConfig;
    },
    submit: ({ data, params }) => {
      const url = `${commonConfig.HJQG_BACKEND}/v1/product-spus/submit`;
      const axiosConfig = {
        url,
        data,
        params,
        method: 'POST',
      };
      return axiosConfig;
    },
  },
  pageSize: 10,
  selection: 'multiple',
  primaryKey: 'productSpuId',
  fields: [
    // 列表显示字段
    {
      name: 'productSpuId',
      label: 'spuId',
      type: 'number',
    },
    {
      name: 'productSpuCode',
      label: 'spu编码',
      type: 'string',
      required: true,
      pattern: /^[\dA-Z]*$/,
      defaultValidationMessages: {
        patternMismatch: '只能输入大写字母和数字, 例如: AB0001', // 正则不匹配的报错信息
      },
    },
    {
      name: 'categoryObject',
      label: '商品类型',
      type: 'object',
      lovCode: 'JIANQIAO.PRODUCT_CATEGORY',
      ignore: 'always',
      required: true,
    },
    {
      name: 'categoryId',
      label: '商品类型ID',
      type: 'number',
      bind: 'categoryObject.categoryId',
    },
    {
      name: 'categoryCode',
      label: '商品类型编码',
      type: 'string',
      bind: 'categoryObject.categoryCode',
      ignore: 'always',
    },
    {
      name: 'categoryName',
      label: '商品类型名称',
      type: 'string',
      bind: 'categoryObject.categoryName',
      ignore: 'always',
    },
    {
      name: 'title',
      label: 'spu名称',
      type: 'string',
      required: true,
    },
    {
      name: 'postStatusCode',
      label: '发布状态',
      type: 'string',
      required: true,
      defaultValue: 'PENDING',
      lookupCode: 'JIANQIAO.PRODUCT_POST_STATUS',
    },
    {
      name: 'shelfStatus',
      label: '上下架状态',
      type: 'string',
      required: true,
      defaultValue: 'PENDING',
      lookupCode: 'JIANQIAO.PRODUCT_SHELF_STATUS',
    },
    {
      name: 'salesVolume',
      label: '销量/元',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'customerGrade',
      label: '买家评分',
      type: 'number',
    },
    // 剩余字段
    {
      name: 'taxRate',
      label: '税率',
      type: 'number',
    },
    {
      name: 'orderSeq',
      label: '排序权重',
      type: 'number',
      defaultValue: 20,
    },
    {
      name: 'isEnableExpressed',
      label: '是否支持快递配送',
      type: 'number',
      defaultValue: 1,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'isEnablePickedUp',
      label: '是否支持自提',
      type: 'number',
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'description',
      label: '商品描述',
      type: 'string',
    },
    {
      name: 'recommendation',
      label: '推荐语',
      type: 'string',
    },
    {
      name: 'keyWords',
      label: '关键字',
      type: 'string',
    },
    {
      name: 'isStopSelling',
      label: '是否停止销售',
      type: 'number',
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
  ],
  queryFields: [
    {
      name: 'productSpuCode',
      label: 'spu编码',
      type: 'string',
    },
    {
      name: 'title',
      label: 'spu名称',
      type: 'string',
    },
    {
      name: 'shelfStatus',
      label: '上下架状态',
      type: 'string',
      lookupCode: 'JIANQIAO.PRODUCT_SHELF_STATUS',
    },
    {
      name: 'categoryObject',
      label: '商品类型',
      type: 'object',
      lovCode: 'JIANQIAO.PRODUCT_CATEGORY',
      textField: 'categoryName',
      valueField: 'categoryId',
      ignore: 'always',
    },
    {
      name: 'categoryId',
      label: '商品类型ID',
      type: 'number',
      bind: 'categoryObject.categoryId',
    },
  ],
});