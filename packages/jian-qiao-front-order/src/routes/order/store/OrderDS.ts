import commonConfig from '@common/config/commonConfig';
import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { AxiosRequestConfig } from 'axios';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';


export default (): DataSetProps => ({
  transport: {
    read: (config: AxiosRequestConfig) => {
      const url = `${commonConfig.HJQG_BACKEND}/v1/orders`;
      const axiosConfig: AxiosRequestConfig = {
        ...config,
        url,
        method: 'GET',
      };
      return axiosConfig;
    },
  },
  pageSize: 10,
  primaryKey: 'orderId',
  fields: [
    {
      name: 'orderId',
      label: '订单ID',
      type: 'number' as FieldType,
    },
    {
      name: 'orderCode',
      label: '订单编码',
      type: 'string' as FieldType,
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
      name: 'orderStatusCode',
      type: 'string' as FieldType,
      label: '订单状态',
      lookupCode: 'JIANQIAO.ORDER_STATUS',
    },
    {
      name: 'buyerRemarks',
      label: '买家备注',
      type: 'string' as FieldType,
    },
    {
      name: 'sellerRemarks',
      label: '卖家备注',
      type: 'string' as FieldType,
    },
    {
      name: 'paidTime',
      label: '付款时间',
      type: FieldType.dateTime,
    },
    {
      name: 'isPaid',
      type: 'number' as FieldType,
      label: '是否付款',
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'paidAmount',
      type: 'number' as FieldType,
      label: '实付金额/元',
    },
    {
      name: 'totalAmount',
      type: 'number' as FieldType,
      label: '总价/元',
    },
    {
      name: 'addressId',
      type: 'number' as FieldType,
      label: '收货地址ID',
    },
    {
      name: 'orderAddress',
      type: 'object' as FieldType,
      label: '收货地址',
    },
    {
      name: 'addressCombine',
      label: '收货地址',
      type: 'string' as FieldType,
      bind: 'orderAddress.addressCombine'
    },
    {
      name: 'deliveryTypeCode',
      label: '配送方式',
      type: 'string' as FieldType,
      lookupCode: 'JIANQIAO.DELIVERY_TYPE'
    },
    {
      name: 'isManualApproved',
      label: '是否手工审批',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'processMessage',
      label: '日志',
      type: FieldType.string,
    },
    {
      name: 'isCommented',
      label: '是否已评价',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'invoiceStatusCode',
      type: 'string' as FieldType,
      label: '开票状态',
      // lookupCode: '',
    },
    {
      name: 'isPointAccumulate',
      label: '是否累计积分',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'isManualRecording',
      label: '是否手工单',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'customerId',
      type: 'number' as FieldType,
      label: '会员ID',
    },
    {
      name: 'isMajorCustomer',
      label: '是否大客户订单',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'isDelete',
      label: '是否删除',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'remarks',
      type: 'string' as FieldType,
      label: '备注',
    },
    {
      name: 'deliveryTime',
      type: FieldType.dateTime,
      label: '快递配送时间',
    },
    {
      name: 'deliveryNumber',
      type: 'string' as FieldType,
      label: '快递单号',
    },
    {
      name: 'deliveryCarrier',
      type: 'string' as FieldType,
      label: '承运商',
    },
    {
      name: 'consignmentCode',
      type: 'string' as FieldType,
      label: '配货单编号',
    },
    {
      name: 'refundOrderCode',
      type: 'string' as FieldType,
      label: '退款单编号',
    },
    {
      name: 'isDeliveryDispatch',
      label: '快递是否已发出',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
  ],
  queryFields: [
    {
      name: 'orderCode',
      label: '订单编码',
      type: 'string' as FieldType,
    },
    {
      name: 'customerId',
      label: '会员ID',
      type: 'number' as FieldType,
    },
    {
      name: 'isPaid',
      label: '是否付款',
      type: 'number' as FieldType,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'isDeliveryDispatch',
      label: '快递是否已发出',
      type: 'number' as FieldType,
      lookupCode: 'HPFM.FLAG',
    },
  ],
});