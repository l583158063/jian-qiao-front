import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';


export default (): DataSetProps => ({
  pageSize: 10,
  primaryKey: 'orderEntryId',
  fields: [
    {
      name: 'orderEntryId',
      label: '订单行ID',
      type: 'number' as FieldType,
    },
    {
      name: 'orderId',
      label: '订单ID',
      type: 'number' as FieldType,
    },
    {
      name: 'entryNumber',
      label: '订单行序号',
      type: 'number' as FieldType,
    },
    {
      name: 'quantity',
      type: 'number' as FieldType,
      label: '商品数量',
    },
    {
      name: 'unitPrice',
      label: '商品单价/元',
      type: 'number' as FieldType,
    },
    {
      name: 'productSkuId',
      label: '商品skuID',
      type: 'number' as FieldType,
    },
    {
      name: 'productSkuId',
      label: '商品skuID',
      type: 'number' as FieldType,
    },
    {
      name: 'title',
      label: '商品sku名称',
      type: FieldType.string,
    },
    {
      name: 'isGift',
      type: 'number' as FieldType,
      label: '是否赠品',
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'actualPaidAmount',
      type: 'number' as FieldType,
      label: '会员实际支付金额/元',
    },
    {
      name: 'returnOrderEntryId',
      type: 'number' as FieldType,
      label: '退货单行ID',
    },
    {
      name: 'isReturned',
      label: '是否退货',
      type: 'number' as FieldType,
      defaultValue: 0,
      lookupCode: 'HPFM.FLAG',
    },
    {
      name: 'statusCode',
      label: '订单行状态',
      type: 'string' as FieldType,
      lookupCode: 'JIANQIAO.ORDER_STATUS',
    },
  ],
});