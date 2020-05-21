import commonConfig from '@common/config/commonConfig';
import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { AxiosRequestConfig } from 'axios';
import { FieldType, DataSetSelection, FieldIgnore } from 'choerodon-ui/pro/lib/data-set/enum';

export default (): DataSetProps => ({
  transport: {
    read: (config: AxiosRequestConfig) => {
      const url = `${commonConfig.HJQG_BACKEND}/v1/product-skus`;
      const axiosConfig: AxiosRequestConfig = {
        ...config,
        url,
        method: 'GET',
      };
      return axiosConfig;
    },
    submit: ({ data, params }) => {
      const url = `${commonConfig.HJQG_BACKEND}/v1/product-skus/submit`;
      const axiosConfig: AxiosRequestConfig = {
        url,
        data,
        params,
        method: 'POST',
      };
      return axiosConfig;
    },
  },
  pageSize: 10,
  selection: DataSetSelection.multiple,
  primaryKey: 'productSkuId',
  fields: [
    {
      name: 'productSkuId',
      label: 'skuId',
      type: 'number' as FieldType,
    },
    {
      name: 'productSkuCode',
      label: 'sku编码',
      type: 'string' as FieldType,
      required: true,
      pattern: /^[\dA-Z]*$/,
      defaultValidationMessages: {
        patternMismatch: '只能输入大写字母和数字, 例如: AB0001', // 正则不匹配的报错信息
      },
    },
    {
      name: 'productSpuObject',
      type: 'object' as FieldType,
      label: '商品spu',
      lovCode: 'JIANQIAO.PRODUCT_SPU_OBJECT',
      required: true,
      ignore: FieldIgnore.always,
    },
    {
      name: 'productSpuId',
      label: 'spuId',
      type: 'number' as FieldType,
      required: true,
      bind: 'productSpuObject.productSpuId',
    },
    {
      name: 'shelfStatus',
      type: 'string' as FieldType,
      label: '上下架状态',
      bind: 'productSpuObject.shelfStatus',
      ignore: FieldIgnore.always,
    },
    {
      name: 'statusCode',
      type: 'string' as FieldType,
      label: '商品状态',
      lookupCode: 'JIANQIAO.PRODUCT_SKU_STATUS_CODE',
    },
    {
      name: 'title',
      type: 'string' as FieldType,
      label: '标题',
      required: true,
    },
    {
      name: 'recommendation',
      label: '推荐语',
      type: 'string' as FieldType,
    },
    {
      name: 'isEliminatePrice',
      label: '排除价格',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'isEliminateStockLevel',
      label: '排除库存',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'isExistStock',
      label: '是否有库存',
      type: 'number' as FieldType,
      defaultValue: 1,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'isCalculateStockLevel',
      label: '上下架已出发库存计算',
      type: 'number' as FieldType,
      defaultValue: 1,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'countryObject',
      type: 'object' as FieldType,
      label: '产地，国家',
      // lovCode: '',
      textField: 'countryName',
      ignore: FieldIgnore.always,
    },
    {
      name: 'habitat',
      type: 'string' as FieldType,
      label: '产地',
    },
    {
      name: 'imageUrl',
      type: 'string' as FieldType,
      label: '图片url',
    },
  ],
  queryFields: [
    {
      name: 'productSkuCode',
      label: 'sku编码',
      type: 'string' as FieldType,
    },
    {
      name: 'title',
      label: 'spu名称',
      type: 'string' as FieldType,
    },
    {
      name: 'productSpuObject',
      type: 'object' as FieldType,
      label: '商品spu',
      // lovCode: '',
      ignore: FieldIgnore.always,
    },
    {
      name: 'productSpuId',
      label: 'spuId',
      type: 'number' as FieldType,
      bind: 'productSpuObject.productSpuId',
    },
    {
      name: 'isExistStock',
      label: '是否有库存',
      type: 'number' as FieldType,
      lookupCode: 'HPFM.FLAG',
    },
  ],
})