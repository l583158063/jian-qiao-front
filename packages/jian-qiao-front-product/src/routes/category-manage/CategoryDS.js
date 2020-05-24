import commonConfig from '@common/config/commonConfig';

export default () => ({
  transport: {
    read: config => {
      const url = `${commonConfig.HJQG_BACKEND}/v1/product-categorys`;
      const axiosConfig = {
        ...config,
        url,
        method: 'GET',
      };
      return axiosConfig;
    },
    submit: ({ data, params }) => {
      const url = `${commonConfig.HJQG_BACKEND}/v1/product-categorys/submit`;
      const axiosConfig = {
        url,
        data,
        params,
        method: 'POST',
      };
      return axiosConfig;
    },
  },
  autoQuery: true,
  pageSize: 10,
  selection: 'multiple',
  primaryKey: 'categoryId',
  fields: [
    {
      name: 'categoryId',
      label: '类型ID',
      type: 'number',
    },
    {
      name: 'categoryCode',
      label: '类型编码',
      type: 'string',
      required: true,
      pattern: /^[_A-Z]*$/,
      defaultValidationMessages: {
        patternMismatch: '只能输入大写字母和下划线, 例如: AB_C', // 正则不匹配的报错信息
      },
    },
    {
      name: 'categoryName',
      label: '类型名称',
      type: 'string',
      required: true,
    },
    {
      name: 'isActive',
      label: '启用标识',
      type: 'string',
      required: true,
      defaultValue: 1,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'orderSeq',
      label: '排序',
      type: 'number',
    },
    {
      name: 'remark',
      label: '备注',
      type: 'string',
    },
  ],
  queryFields: [
    {
      name: 'categoryCode',
      label: '类型编码',
      type: 'string',
    },
    {
      name: 'categoryName',
      label: '类型名称',
      type: 'string',
    },
    {
      name: 'isActive',
      label: '启用标识',
      type: 'number',
      lookupCode: 'HPFM.FLAG',
    },
  ],
});