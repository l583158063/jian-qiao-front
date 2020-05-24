import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import OrderDS from '../store/OrderDS';
import OrderEntryDS from '../store/OrderEntryDS';
import { DataSet, Button, Form, Table, TextField, DateTimePicker, Select, Currency, TextArea, Axios } from "choerodon-ui/pro";
import { Bind } from 'lodash-decorators';
import { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import { ColumnAlign } from 'choerodon-ui/pro/lib/table/enum';
import { yesOrNoRender } from 'utils/renderer';
import { routerRedux } from 'dva/router';
import notification from 'utils/notification';
import { getAccessToken } from 'utils/utils';
import commonConfig from '@common/config/commonConfig';


interface OrderDetailPageProps {
  dispatch: Dispatch<any>;
  match: any;
  location: any;
}

@connect()
export default class OrderDetailPage extends Component<OrderDetailPageProps> {
  state = {
    isConsigned: false,
    isRefunded: false,
    isCompeleted: false,
    isWaitingConfirmed: false,
  };

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

  consignmentCode = null;
  refundOrderCode = null;

  async componentDidMount() {
    this.detailDS.queryParameter['orderCode'] = this.props.match.params.orderCode;
    this.refreshPage();
  }

  @Bind()
  async refreshPage() {
    await this.detailDS.query();
    // 有值则按钮可用
    this.consignmentCode = this.detailDS.current?.getPristineValue('consignmentCode');
    this.refundOrderCode = this.detailDS.current?.getPristineValue('refundOrderCode');
    if (this.consignmentCode) {
      this.setState({ isConsigned: true });
    }
    if (this.refundOrderCode) {
      this.setState({ isRefunded: true });
    }
    this.setState({ isCompeleted: this.detailDS.current?.getPristineValue('orderStatusCode') === 'COMPLETE' });
    this.setState({ isWaitingConfirmed: this.detailDS.current?.getPristineValue('orderStatusCode') === 'WAITING_CONFIRM' });
  }

  @Bind()
  async handleConfirmOrder() {
    const orderId = new URLSearchParams(this.props.location.search).get('orderId');

    const accessToken = getAccessToken();
    const headers = {
      Authorization: '',
    };
    if (accessToken) {
      headers.Authorization = `bearer ${accessToken}`;
    }

    const url = `${process.env.API_HOST}${commonConfig.HJQG_BACKEND}/v1/orders/confirm-order`;

    const axiosConfig = {
      headers: headers,
      params: {
        orderId: orderId,
      },
    };

    Axios
      .post(url, null, axiosConfig)
      .then(() => {
        notification.success({
          message: '操作成功',
          description: '',
        });
        this.refreshPage();
      })
      .catch(error => {
        notification.error({
          message: '操作失败: ' + error,
          description: '',
        });
      });
  }

  @Bind()
  async handleGotoRefundDetail() {
    if (this.refundOrderCode) {
      const { dispatch } = this.props;
      const pathname = `/jian-qiao-front-fulfilment/refund-order/refund-order-detail/${this.refundOrderCode}`;
      dispatch(
        routerRedux.push({
          pathname,
        })
      );
    } else {
      notification.warning({
        message: '该订单没有对应的退款单',
        description: '',
      });
    }
  }

  @Bind()
  async handleGotoConsignmentDetail() {
    if (this.consignmentCode) {
      const { dispatch } = this.props;
      const pathname = `/jian-qiao-front-order/consignment/consignment-detail/${this.consignmentCode}`;
      dispatch(
        routerRedux.push({
          pathname,
        })
      );
    } else {
      notification.warning({
        message: '该订单没有对应的配货单',
        description: '',
      });
    }
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
            hidden={this.state.isRefunded}
            color={ButtonColor.primary}
            onClick={this.handleGotoRefundDetail}
            disabled={!this.state.isRefunded}
            icon='link'
          >
            查看退款单
          </Button>
          <Button
            color={ButtonColor.primary}
            onClick={this.handleGotoConsignmentDetail}
            disabled={!this.state.isConsigned}
            icon='link'
          >
            查看配货单
          </Button>
          <Button
            color={ButtonColor.primary}
            onClick={this.handleConfirmOrder}
            disabled={!this.state.isWaitingConfirmed}
            hidden={!this.state.isWaitingConfirmed}
          >
            确认并配货
          </Button>
        </Header>
        <Content>
          <Form
            disabled={this.state.isCompeleted}
            dataSet={this.detailDS}
            columns={4}
          >
            <TextField pristine name='orderId' />
            <TextField pristine name='orderCode' />
            <Select pristine name='orderStatusCode' />
            <TextField pristine name='buyerRemarks' />
            <TextField name='sellerRemarks' />
            <DateTimePicker pristine name='paidTime' />
            <Select pristine name='isPaid' />
            <Currency pristine name='paidAmount' currency='CNY' />
            <Currency pristine name='totalAmount' currency='CNY' />
            <TextField pristine name='addressCombine' />
            <TextField pristine name='deliveryTypeCode' />
            <Select pristine name='isManualApproved' />
            <Select pristine name='isCommented' />
            <TextField pristine name='customerId' />
            <TextField name='remarks' />
            {/* <DateTimePicker pristine name='deliveryTime' /> */}
            {/* <TextField pristine name='deliveryNumber' /> */}
            {/* <TextField pristine name='deliveryCarrier' /> */}
            <Select pristine name='isDeliveryDispatch' />
            <TextArea
              pristine
              name='processMessage'
              colSpan={2}
              rowSpan={2}

            />
          </Form>
          <Table
            header='订单行'
            dataSet={this.entryDS}
            columns={this.entryColumns}
          />
        </Content>
      </>
    );
  }

}
