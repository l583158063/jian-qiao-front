import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import ConsignmentDS from '../store/ConsignmentDS';
import ConsignmentEntryDS from '../store/ConsignmentEntryDS';
import { DataSet, Form, Table, TextField, Select, DateTimePicker, Currency, Button, Modal, Axios } from "choerodon-ui/pro";
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import { Bind } from 'lodash-decorators';
import { ColumnAlign } from 'choerodon-ui/pro/lib/table/enum';
import { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import notification from 'utils/notification';
import { routerRedux } from 'dva/router';
import { getAccessToken } from 'hzero-front/lib/utils/utils';
import commonConfig from '@common/config/commonConfig';
import { AxiosRequestConfig } from 'axios';


interface ConsignmentDetailPageProps {
  dispatch: Dispatch<any>;
  location: any,
  match: any,
}

@connect()
export default class ConsignmentDetailPage extends Component<ConsignmentDetailPageProps> {
  state = {
    consignmentStatusCode: '',
    isApproved: false,
  };

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
  url = `${process.env.API_HOST}${commonConfig.HJQG_BACKEND}/v1/consignments/handle-operation`;


  async componentDidMount() {
    this.detailDS.queryParameter['consignmentCode'] = this.props.match.params.consignmentCode;
    this.refreshPage();
  }

  @Bind()
  async refreshPage() {
    await this.detailDS.query();
    this.orderCode = this.detailDS.current?.getPristineValue('orderCode');
    this.setState({
      consignmentStatusCode: this.detailDS.current?.getPristineValue('consignmentStatusCode'),
      isApproved: this.detailDS.current?.getPristineValue('isManualApproved') === 1,
    });
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
  getAxiosConfig(params?: any): AxiosRequestConfig {
    const accessToken = getAccessToken();
    const headers = {
      Authorization: '',
    };
    if (accessToken) {
      headers.Authorization = `bearer ${getAccessToken()}`;
    } else {
      notification.error({
        message: '无法获取认证信息',
        description: '',
      });
      throw new Error('无法获取认证信息');
    }

    return {
      headers: headers,
      params: {
        ...params,
      },
    };
  }

  @Bind()
  axiosPost(url, data, axiosConfig) {
    Axios
      .post(url, data, axiosConfig)
      .then(() => {
        notification.success({
          message: '操作成功',
          description: '',
        });
        this.refreshPage();
      })
      .catch(error => {
        console.log("error: " + error);
        notification.error({
          message: '操作失败: ' + error,
          description: '',
        });
      });
  }

  /**
   * 审核
   */
  @Bind()
  async handleApprove() {
    const { current } = this.detailDS;
    current?.set('consignmentStatusCode', 'CONSIGNING');
    this.axiosPost(this.url, current?.toData(), this.getAxiosConfig());
  }

  /**
   * 配货完成
   */
  @Bind()
  async handleConsign() {
    const { current } = this.detailDS;
    current?.set('consignmentStatusCode', 'WAITING_DELIVERY');

    // 校验数据
    if (!(current?.get('consigner'))) {
      notification.error({
        message: '操作失败: 请填写配货人信息',
        description: '',
      });
      return;
    }

    this.axiosPost(this.url, current?.toData(), this.getAxiosConfig());
  }

  /**
   * 发货
   */
  @Bind()
  async handleDelivery() {
    const { current } = this.detailDS;
    current?.set('consignmentStatusCode', 'DELIVERED');

    // 校验数据
    if (!(current?.get('deliveryNumber')) ||
      !(current?.get('deliveryCarrier')) ||
      !(current?.get('deliveryCost'))) {
      notification.error({
        message: '操作失败: 请填写完整的发货信息（物流单号、承运商、运费）',
        description: '',
      });
      return;
    }

    this.axiosPost(this.url, current?.toData(), this.getAxiosConfig());
  }

  /**
   * 自提
   */
  @Bind()
  async popPickupConfirmModel() {
    Modal.confirm({
      title: '是否确认自提',
      onOK: this.handlePickup,
    });
  }

  @Bind()
  async handlePickup() {
    const { current } = this.detailDS;
    if (current?.getPristineValue('deliveryTypeCode') === 'PICKUP') {
      const url = `${process.env.API_HOST}${commonConfig.HJQG_BACKEND}/v1/consignments/handle-pickup`;
      this.axiosPost(url, current?.toData(), this.getAxiosConfig());
    }
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
            disabled={!this.state.isApproved}
            hidden={!(this.state.isApproved &&
              (this.detailDS.current?.getPristineValue('deliveryTypeCode') === 'PICKUP'))}
            onClick={this.popPickupConfirmModel}
          >
            自提
          </Button>

          <Button
            hidden={!(this.state.isApproved &&
              (this.detailDS.current?.getPristineValue('consignmentStatusCode')) === 'WAITING_DELIVERY')}
            color={ButtonColor.primary}
            onClick={this.handleDelivery}
          >
            发货
          </Button>

          <Button
            hidden={!(this.state.isApproved &&
              (this.detailDS.current?.getPristineValue('consignmentStatusCode')) === 'CONSIGNING')}
            color={ButtonColor.primary}
            onClick={this.handleConsign}
          >
            配货完成
          </Button>

          <Button
            hidden={this.state.isApproved}
            color={ButtonColor.primary}
            onClick={this.handleApprove}
          >
            审核
          </Button>
          <Button
            disabled={true}
            hidden={!this.state.isApproved}
            color={ButtonColor.primary}
            onClick={this.handleApprove}
          >
            已审核
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
            disabled={this.detailDS.current?.getPristineValue('consignmentStatusCode') === 'DELIVERED'}
            columns={4}
            dataSet={this.detailDS}
          >
            <TextField pristine name='consignmentCode' />
            <TextField pristine name='orderCode' />
            <Select pristine name='consignmentStatusCode' />
            <DateTimePicker pristine name='approvedDate' />
            <Select pristine name='isManualApproved' />
            <TextField name='consigner' />
            <Select pristine name='deliveryTypeCode' />
            <DateTimePicker pristine name='deliveryDate' />
            <TextField name='deliveryNumber' />
            <Select name='deliveryCarrier' />
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
