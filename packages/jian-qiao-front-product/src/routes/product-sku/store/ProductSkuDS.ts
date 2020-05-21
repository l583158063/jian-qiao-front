import commonConfig from '@common/config/commonConfig';
import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { AxiosRequestConfig } from 'axios';
import { FieldType, DataSetSelection } from 'choerodon-ui/pro/lib/data-set/enum';

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
      name: 'productSpuId',
      label: 'spuId',
      type: 'number' as FieldType,
    },
    {
      name: '',
      type: '' as FieldType,
      label: '',
    }

  ],
  queryFields: [

  ],
})