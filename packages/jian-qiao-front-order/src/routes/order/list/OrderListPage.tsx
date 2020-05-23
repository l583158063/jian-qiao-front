import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { DataSet, Table, Button } from "choerodon-ui/pro";
import OrderDS from '../store/OrderDS';
import { Bind } from 'lodash-decorators';
import { routerRedux } from 'dva/router';
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import { yesOrNoRender } from 'utils/renderer';
import { ColumnAlign, ColumnLock } from 'choerodon-ui/pro/lib/table/enum';


interface OrderListPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class OrderListPage extends Component<OrderListPageProps> {

  tableDS = new DataSet({
    autoQuery: true,
    ...OrderDS(),
  });

  @Bind()
  async handleGotoDetail(record) {
    const orderCode = record.get('orderCode');
    const { dispatch } = this.props;
    const pathname = `/jian-qiao-front-order/order/order-detail/${orderCode}`;
    dispatch(
      routerRedux.push({
        pathname,
      })
    );
  }

  get columns(): ColumnProps[] {
    return [
      { name: 'orderCode', },
      { name: 'orderStatusCode', align: ColumnAlign.center, },
      {
        header: '查看',
        renderer: ({ record }) => {
          return (
            <Button onClick={() => this.handleGotoDetail(record)}>
              详情
            </Button>
          );
        },
        lock: ColumnLock.right,
        align: ColumnAlign.center,
      },
      {
        name: 'isPaid',
        renderer: ({ value }) => yesOrNoRender(value),
        align: ColumnAlign.center,
      },
      { name: 'totalAmount', align: ColumnAlign.center, },
      { name: 'customerId', align: ColumnAlign.center, },
      {
        name: 'isDeliveryDispatch',
        renderer: ({ value }) => yesOrNoRender(value),
        align: ColumnAlign.center,
      },
    ];
  }

  render() {
    return (
      <>
        <Header title='订单列表' >

        </Header>
        <Content>
          <Table
            dataSet={this.tableDS}
            columns={this.columns}
            queryFieldsLimit={4}
          />
        </Content>
      </>
    );
  }

}
