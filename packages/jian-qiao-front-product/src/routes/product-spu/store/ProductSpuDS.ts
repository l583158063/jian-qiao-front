import commonConfig from '@common/config/commonConfig';
import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { AxiosRequestConfig } from 'axios';
import { FieldType, DataSetSelection, FieldIgnore } from 'choerodon-ui/pro/lib/data-set/enum';

export default (): DataSetProps => ({
  transport: {
    read: (config: AxiosRequestConfig) => {
      const url = `${commonConfig.HJQG_BACKEND}/v1/product-spus`;
      const axiosConfig: AxiosRequestConfig = {
        ...config,
        url,
        method: 'GET',
      };
      return axiosConfig;
    },
    submit: ({ data, params }) => {
      const url = `${commonConfig.HJQG_BACKEND}/v1/product-spus/submit`;
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
  primaryKey: 'productSpuId',
  fields: [
    // 列表显示字段
    {
      name: 'productSpuId',
      label: 'spuId',
      type: 'number' as FieldType,
    },
    {
      name: 'productSpuCode',
      label: 'spu编码',
      type: 'string' as FieldType,
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
      name: 'categoryObject',
      label: '商品类型',
      type: 'object' as FieldType,
      lovCode: 'JIANQIAO.PRODUCT_CATEGORY',
      ignore: 'always' as FieldIgnore,
      required: true,
    },
    {
      name: 'categoryId',
      label: '商品类型ID',
      type: 'number' as FieldType,
      bind: 'categoryObject.categoryId',
    },
    {
      name: 'categoryCode',
      label: '商品类型编码',
      type: 'string' as FieldType,
      bind: 'categoryObject.categoryCode',
      ignore: 'always' as FieldIgnore,
    },
    {
      name: 'categoryName',
      label: '商品类型名称',
      type: 'string' as FieldType,
      bind: 'categoryObject.categoryName',
      ignore: 'always' as FieldIgnore,
    },
    {
      name: 'title',
      label: 'spu名称',
      type: 'string' as FieldType,
      required: true,
    },
    {
      name: 'postStatusCode',
      label: '发布状态',
      type: 'string' as FieldType,
      required: true,
      defaultValue: 'PENDING',
      lookupCode: 'JIANQIAO.PRODUCT_POST_STATUS',
    },
    {
      name: 'shelfStatus',
      label: '上下架状态',
      type: 'string' as FieldType,
      required: true,
      defaultValue: 'PENDING',
      lookupCode: 'JIANQIAO.PRODUCT_SHELF_STATUS',
    },
    {
      name: 'salesVolume',
      label: '销量/元',
      type: 'number' as FieldType,
      defaultValue: 0,
    },
    {
      name: 'customerGrade',
      label: '买家评分',
      type: 'number' as FieldType,
    },
    // 剩余字段
    {
      name: 'taxRate',
      label: '税率',
      type: 'number' as FieldType,
    },
    {
      name: 'orderSeq',
      label: '排序权重',
      type: 'number' as FieldType,
      defaultValue: 20,
    },
    {
      name: 'isEnableExpressed',
      label: '是否支持快递配送',
      type: 'number' as FieldType,
      defaultValue: 1,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'isEnablePickedUp',
      label: '是否支持自提',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'description',
      label: '商品描述',
      type: 'string' as FieldType,
    },
    {
      name: 'recommendation',
      label: '推荐语',
      type: 'string' as FieldType,
    },
    {
      name: 'keyWords',
      label: '关键字',
      type: 'string' as FieldType,
    },
    {
      name: 'priceRange',
      label: '价格区间/元',
      type: 'string' as FieldType,
    },
    {
      name: 'isStopSelling',
      label: '是否停止销售',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'onlineDate',
      label: '上架日期',
      type: 'dateTime' as FieldType,
    },
    {
      name: 'offlineDate',
      label: '下架日期',
      type: 'dateTime' as FieldType,
    },
  ],
  queryFields: [
    {
      name: 'productSpuCode',
      label: 'spu编码',
      type: 'string' as FieldType,
    },
    {
      name: 'title',
      label: 'spu名称',
      type: 'string' as FieldType,
    },
    {
      name: 'shelfStatus',
      label: '上下架状态',
      type: 'string' as FieldType,
      lookupCode: 'JIANQIAO.PRODUCT_SHELF_STATUS',
    },
    {
      name: 'categoryObject',
      label: '商品类型',
      type: 'object' as FieldType,
      lovCode: 'JIANQIAO.PRODUCT_CATEGORY',
      textField: 'categoryName',
      valueField: 'categoryId',
      ignore: 'always' as FieldIgnore,
    },
    {
      name: 'categoryId',
      label: '商品类型ID',
      type: 'number' as FieldType,
      bind: 'categoryObject.categoryId',
    },
  ],
});