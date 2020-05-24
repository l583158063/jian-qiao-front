import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import ConsignmentDS from '../store/ConsignmentDS';
import ConsignmentEntryDS from '../store/ConsignmentEntryDS';
import { DataSet, Form, Table, TextField, Select, DateTimePicker, Currency, Button, Modal } from "choerodon-ui/pro";
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import { Bind } from 'lodash-decorators';
import { ColumnAlign } from 'choerodon-ui/pro/lib/table/enum';
import { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import notification from 'utils/notification';
import { routerRedux } from 'dva/router';


interface ConsignmentDetailPageProps {
  dispatch: Dispatch<any>;
  location: any,
  match: any,
}

@connect()
export default class ConsignmentDetailPage extends Component<ConsignmentDetailPageProps> {

  entryDS = new DataSet({
    autoQuery: false,
    ...ConsignmentEntryDS(),
  });

  detailDS = new DataSet({
    autoQuery: false,
    ...ConsignmentDS(),
    children: {
      consignmentEntryList: this.entryDS,
    },
  });

  orderCode = null;

  async componentDidMount() {
    this.detailDS.queryParameter['consignmentCode'] = this.props.match.params.consignmentCode;
    this.refreshPage();
  }

  @Bind()
  async refreshPage() {
    await this.detailDS.query();
    this.orderCode = this.detailDS.current?.getPristineValue('orderCode');
  }

  @Bind()
  async handleReturnOrder() {
    if (this.orderCode) {
      const { dispatch } = this.props;
      const pathname = `/jian-qiao-front-order/order/order-detail/${this.orderCode}`;
      dispatch(
        routerRedux.push({
          pathname,
        })
      );
    } else {
      notification.warning({
        message: '无法关联到订单',
        description: '',
      });
      return;
    }
  }

  @Bind()
  async handleApprove() {

  }

  @Bind()
  async handleConsign() {

  }

  @Bind()
  async handleDelivery() {

  }

  @Bind()
  async popPickupConfirmModel() {
    Modal.confirm({
      title: '是否确认自提',
      onOK: this.handlePickup,
    });
  }

  @Bind()
  async handlePickup() {

  }

  get entryColumns(): ColumnProps[] {
    return [
      {
        name: 'entryNumber',
        align: ColumnAlign.center,
        width: 80,
      },
      {
        name: 'productSkuCode',
        align: ColumnAlign.center,
      },
      {
        name: 'title',
        align: ColumnAlign.center,
      },
      {
        name: 'quantity',
        align: ColumnAlign.center,
        width: 90,
      },
      {
        name: 'remarks',
        align: ColumnAlign.center,
      },
    ];
  }

  render() {
    return (
      <>
        <Header title='配货单详情'
          backPath='/jian-qiao-front-order/consignment/consignment-list'
        >
          <Button
            onClick={this.popPickupConfirmModel}
          >
            自提
          </Button>

          <Button
            color={ButtonColor.primary}
            onClick={this.handleDelivery}
          >
            发货
          </Button>

          <Button
            color={ButtonColor.primary}
            onClick={this.handleConsign}
          >
            配货完成
          </Button>

          <Button
            color={ButtonColor.primary}
            onClick={this.handleApprove}
          >
            确认
          </Button>

          <Button
            icon='link'
            color={ButtonColor.primary}
            onClick={this.handleReturnOrder}
          >
            跳转至订单
          </Button>
        </Header>
        <Content>
          <Form
            columns={4}
            dataSet={this.detailDS}
          >
            <TextField pristine name='consignmentCode' />
            <TextField pristine name='orderCode' />
            <Select pristine name='consignmentStatusCode' />
            <DateTimePicker pristine name='approvedDate' />
            <Select pristine name='isManualApproved' />
            <TextField name='consigner' />
            <DateTimePicker pristine name='deliveryDate' />
            <TextField name='deliveryNumber' />
            <TextField name='deliveryCarrier' />
            <Currency name='deliveryCost' currency='CNY' />
            <TextField name='remarks' />
            <TextField pristine name='combineAddress' />
          </Form>
          <Table
            header='配货单行'
            dataSet={this.entryDS}
            columns={this.entryColumns}
            pristine
          />
        </Content>
      </>
    );
  }

}
