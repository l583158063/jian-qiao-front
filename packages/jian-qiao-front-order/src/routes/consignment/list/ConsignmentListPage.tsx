import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { DataSet, Table, Button } from "choerodon-ui/pro";
import ConsignmentDS from '../store/ConsignmentDS';
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import { ColumnAlign, ColumnLock } from 'choerodon-ui/pro/lib/table/enum';
import { FuncType } from 'choerodon-ui/pro/lib/button/enum';
import { Bind } from 'lodash-decorators';
import { routerRedux } from 'dva/router';


interface ConsignmentListPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class ConsignmentListPage extends Component<ConsignmentListPageProps> {

  tableDS = new DataSet({
    autoQuery: true,
    ...ConsignmentDS(),
  });

  @Bind()
  async handleGotoDetail(record) {
    const consignmentCode = record.get('consignmentCode');
    const consignmentId = record.get('consignmentId');
    const { dispatch } = this.props;
    const pathname = `/jian-qiao-front-order/consignment/consignment-detail/${consignmentCode}`;
    dispatch(
      routerRedux.push({
        pathname,
        search: `?consignmentId=${consignmentId}`,
      })
    );
  }

  get columns(): ColumnProps[] {
    return [
      {
        name: 'consignmentCode',
        align: ColumnAlign.center,
        width: 180,
      },
      {
        name: 'orderCode',
        align: ColumnAlign.center,
        width: 180,
      },
      {
        name: 'consignmentStatusCode',
        align: ColumnAlign.center,
      },
      {
        header: '查看',
        width: 90,
        renderer: ({ record }) => {
          return (
            <Button
              onClick={() => this.handleGotoDetail(record)}
              icon='link'
              funcType={FuncType.flat}
            >
              详情
            </Button>
          );
        },
        lock: ColumnLock.right,
        align: ColumnAlign.center,
      },
      {
        name: 'consigner',
        align: ColumnAlign.center,
      },
      {
        name: 'deliveryNumber',
        align: ColumnAlign.center,
        width: 180,
      },
      {
        name: 'deliveryCarrier',
        align: ColumnAlign.center,
      },
      {
        name: 'deliveryCost',
        align: ColumnAlign.center,
      },
    ];
  }

  render() {
    return (
      <>
        <Header title='配货单列表' />
        <Content>
          <Table
            dataSet={this.tableDS}
            columns={this.columns}
            queryFieldsLimit={4}
            pristine
          />
        </Content>
      </>
    );
  }

}
