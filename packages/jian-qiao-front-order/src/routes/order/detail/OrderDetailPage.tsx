import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import OrderDS from '../store/OrderDS';
import OrderEntryDS from '../store/OrderEntryDS';
import { DataSet, Button, Form, Table, TextField, DateTimePicker, Select, Currency, TextArea } from "choerodon-ui/pro";
import { Bind } from 'lodash-decorators';
import { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import { ColumnAlign } from 'choerodon-ui/pro/lib/table/enum';
import { yesOrNoRender } from 'utils/renderer';


interface OrderDetailPageProps {
  dispatch: Dispatch<any>;
  match: any;
  location: any;
}

@connect()
export default class OrderDetailPage extends Component<OrderDetailPageProps> {
  state = {};

  entryDS = new DataSet({
    autoQuery: false,
    ...OrderEntryDS(),
  });

  detailDS = new DataSet({
    autoQuery: true,
    ...OrderDS(),
    children: {
      orderEntryList: this.entryDS,
    },
  });

  async componentDidMount() {
    this.detailDS.queryParameter['orderCode'] = this.props.match.params.orderCode;
    await this.detailDS.query();
  }

  @Bind()
  async handleConfirmOrder() {

  }

  get entryColumns(): ColumnProps[] {
    return [
      { name: 'entryNumber', align: ColumnAlign.center, },
      { name: 'orderEntryId', align: ColumnAlign.center, },
      { name: 'productSkuCode', align: ColumnAlign.center, },
      { name: 'title', align: ColumnAlign.center, },
      { name: 'unitPrice', align: ColumnAlign.center, },
      { name: 'quantity', align: ColumnAlign.center, },
      { name: 'actualPaidAmount', align: ColumnAlign.center, },
      {
        name: 'isReturned',
        renderer: ({ value }) => yesOrNoRender(value),
        align: ColumnAlign.center,
      },
      { name: 'statusCode', align: ColumnAlign.center, },
    ];
  }

  render() {
    return (
      <>
        <Header
          title='订单详情'
          backPath='/jian-qiao-front-order/order/order-list'
        >
          <Button
            color={ButtonColor.primary}
            onClick={this.handleConfirmOrder}
          >
            确认并配货
          </Button>
        </Header>
        <Content>
          <Form dataSet={this.detailDS} columns={4}>
            <TextField pristine name='orderId' />
            <TextField pristine name='orderCode' />
            <TextField pristine name='orderStatusCode' />
            <TextField pristine name='buyerRemarks' />
            <TextField name='sellerRemarks' />
            <DateTimePicker pristine name='paidTime' />
            <Select pristine name='isPaid' />
            <Currency pristine name='paidAmount' currency='CNY' />
            <Currency pristine name='totalAmount' currency='CNY' />
            <TextField pristine name='addressCombine' />
            <TextField pristine name='deliveryTypeCode' />
            <Select pristine name='isManualApproved' />
            <TextField pristine name='returnOrderId' />
            <Select pristine name='isCommented' />
            <TextField pristine name='customerId' />
            <TextField name='remarks' />
            <DateTimePicker pristine name='deliveryTime' />
            <TextField pristine name='deliveryNumber' />
            <TextField pristine name='deliveryCarrier' />
            <Select pristine name='isDeliveryDispatch' />
            <TextArea
              pristine
              name='processMessage'
              colSpan={2}
              rowSpan={2}
            />
          </Form>
          <Table
            dataSet={this.entryDS}
            columns={this.entryColumns}
          />
        </Content>
      </>
    );
  }

}
