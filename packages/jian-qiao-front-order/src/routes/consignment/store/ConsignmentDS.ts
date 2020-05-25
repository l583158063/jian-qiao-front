import commonConfig from '@common/config/commonConfig';
import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { AxiosRequestConfig } from 'axios';
import { FieldType, DataSetSelection } from 'choerodon-ui/pro/lib/data-set/enum';

export default (): DataSetProps => ({
  transport: {
    read: (config: AxiosRequestConfig) => {
      const url = `${commonConfig.HJQG_BACKEND}/v1/consignments`;
      const axiosConfig: AxiosRequestConfig = {
        ...config,
        url,
        method: 'GET',
      };
      return axiosConfig;
    },
  },
  pageSize: 10,
  selection: DataSetSelection.multiple,
  primaryKey: 'consignmentId',
  fields: [
    {
      name: 'consignmentId',
      type: 'number' as FieldType,
      label: '配货单ID',
    },
    {
      name: 'orderId',
      type: 'number' as FieldType,
      label: '订单ID',
    },
    {
      name: 'orderCode',
      type: 'string' as FieldType,
      label: '订单编号',
      readOnly: true,
    },
    {
      name: 'consignmentCode',
      type: 'string' as FieldType,
      label: '配货单编号',
      readOnly: true,
    },
    {
      name: 'consignmentStatusCode',
      type: 'string' as FieldType,
      label: '配货单状态',
      lookupCode: 'JIANQIAO.CONSIGNMENT_STATUS',
    },
    {
      name: 'deliveryTypeCode',
      type: 'string' as FieldType,
      label: '配送方式',
      lookupCode: 'JIANQIAO.DELIVERY_TYPE',
    },
    {
      name: 'approvedDate',
      type: FieldType.dateTime,
      label: '审核日期',
      readOnly: true,
    },
    {
      name: 'isManualApproved',
      type: FieldType.number,
      label: '已手工审核',
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'consigner',
      type: FieldType.string,
      label: '配货人',
    },
    {
      name: 'deliveryDate',
      type: FieldType.dateTime,
      label: '发货日期',
    },
    {
      name: 'deliveryNumber',
      type: FieldType.string,
      label: '物流单号',
      pattern: /^[\d]*$/,
      defaultValidationMessages: {
        patternMismatch: '请输入数字',
      },
    },
    {
      name: 'deliveryCarrier',
      type: FieldType.string,
      label: '承运商',
      lookupCode: 'JIANQIAO.DELIVERY_CARRIER',
    },
    {
      name: 'deliveryCost',
      type: FieldType.currency,
      label: '运费',
    },
    {
      name: 'remarks',
      type: FieldType.string,
      label: '备注',
    },
    {
      name: 'combineAddress',
      type: FieldType.string,
      label: '收货地址',
    },
  ],
  queryFields: [
    {
      name: 'consignmentCode',
      type: 'string' as FieldType,
      label: '配货单编号',
    },
    {
      name: 'orderCode',
      type: 'string' as FieldType,
      label: '订单编号',
    },
    {
      name: 'consignmentStatusCode',
      type: 'string' as FieldType,
      label: '配货单状态',
      lookupCode: 'JIANQIAO.CONSIGNMENT_STATUS',
    },
    {
      name: 'consigner',
      type: 'string' as FieldType,
      label: '配货人',
    },
  ],
});