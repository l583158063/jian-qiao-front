import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';


export default (): DataSetProps => ({
  pageSize: 10,
  primaryKey: 'consignmentEntryId',
  fields: [
    {
      name: 'consignmentEntryId',
      label: '配货单行ID',
      type: 'number' as FieldType,
    },
    {
      name: 'entryNumber',
      label: '行号',
      type: 'number' as FieldType,
    },
    {
      name: 'consignmentId',
      label: '配货单头ID',
      type: 'number' as FieldType,
    },
    {
      name: 'quantity',
      type: 'number' as FieldType,
      label: '商品数量',
    },
    {
      name: 'orderEntryId',
      label: '订单行ID',
      type: 'number' as FieldType,
    },
    {
      name: 'productSkuId',
      label: '商品skuID',
      type: 'number' as FieldType,
    },
    {
      name: 'remarks',
      label: '备注',
      type: 'string' as FieldType,
    },
    {
      name: 'title',
      label: '商品sku名称',
      type: FieldType.string,
    },
    {
      name: 'productSkuCode',
      type: 'string' as FieldType,
      label: '商品sku编码',
    },
  ],
});