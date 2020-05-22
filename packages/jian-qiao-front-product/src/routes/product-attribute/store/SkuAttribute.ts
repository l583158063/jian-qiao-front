import commonConfig from '@common/config/commonConfig';
import { DataSetSelection, FieldType } from 'choerodon-ui/pro/lib/data-set/enum';
import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { AxiosRequestConfig } from 'axios';

export default (): DataSetProps => ({
  transport: {
    read: (config: AxiosRequestConfig) => {
      return {
        ...config,
        url: `${commonConfig.HJQG_BACKEND}/v1/product-attribute-skus`,
        method: 'GET',
      }
    },
    submit: ({ data, params }) => {
      const url = `${commonConfig.HJQG_BACKEND}/v1/product-attribute-skus/submit`;
      const axiosConfig: AxiosRequestConfig = {
        url,
        data,
        params,
        method: 'POST',
      };
      return axiosConfig;
    },
  },
  selection: DataSetSelection.multiple,
  pageSize: 10,
  primaryKey: 'attributeSkuId',
  fields: [
    {
      name: 'attributeSkuId',
      type: 'number' as FieldType,
      label: 'sku属性id',
    },
    {
      name: 'productSkuId',
      type: 'number' as FieldType,
      label: '商品skuId',
      required: true,
    },
    {
      name: 'attributeCode',
      type: 'string' as FieldType,
      label: 'sku属性编码',
      required: true,
      pattern: /^[\dA-Z]*$/,
      defaultValidationMessages: {
        patternMismatch: '只能输入大写字母和数字, 例如: AB0001', // 正则不匹配的报错信息
      },
      dynamicProps: {
        // 非新增行要设置为只读
        readOnly: ({ record }) => {
          //   return record.get('id');
          return record.status !== 'add';
        },
      },
    },
    {
      name: 'attributeName',
      type: 'string' as FieldType,
      label: '属性名称',
      required: true,
    },
    {
      name: 'attributeValue',
      type: 'string' as FieldType,
      label: '属性值',
      required: true,
    },
    {
      name: 'isEnabled',
      type: 'number' as FieldType,
      label: '启用标识',
      required: true,
      defaultValue: 1,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'orderSeq',
      type: 'number' as FieldType,
      label: '排序号',
      defaultValue: 20,
    },
    {
      name: 'startDate',
      label: '有效期从',
      type: 'dateTime' as FieldType,
    },
    {
      name: 'endDate',
      label: '有效期至',
      type: 'dateTime' as FieldType,
    },
    {
      name: 'remark',
      label: '备注',
      type: 'string' as FieldType,
    },
  ],
  queryFields: [
    {
      name: 'attributeName',
      type: 'string' as FieldType,
      label: '属性名称',
    },
    {
      name: 'isEnabled',
      type: 'number' as FieldType,
      label: '启用标识',
      lookupCode: 'HPFM.FLAG',
    },
  ],
});