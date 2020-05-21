import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { DataSet, Table, Button, Lov, } from "choerodon-ui/pro";
import ProductSkuDS from "../store/ProductSkuDS";
import { Buttons } from 'choerodon-ui/pro/lib/table/Table';
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import { TableButtonType, ColumnLock, ColumnAlign, } from 'choerodon-ui/pro/lib/table/enum';
import { Bind } from 'lodash-decorators';
import notification from 'utils/notification';
import { routerRedux } from 'dva/router';

interface ProductSkuListPageProps {
  dispatch: Dispatch<any>;
  match: any;
  location: any;
}

@connect()
export default class ProductSkuListPage extends Component<ProductSkuListPageProps> {
  state = {};

  tableDS = new DataSet({
    autoQuery: true,
    ...ProductSkuDS(),
  });

  @Bind()
  async handleGotoDetail(record) {
    const productSkuCode = record.get('productSkuCode');
    const { dispatch } = this.props;
    const pathname = `/jian-qiao-front-product/product-sku/detail/${productSkuCode}`;
    dispatch(
      routerRedux.push({
        pathname,
      })
    );
  }

  @Bind()
  async submit() {
    const validateValue = await this.tableDS.validate(false, false);
    if (!validateValue) {
      notification.error({
        message: '数据校验不通过！',
        description: '',
      });
      return;
    }
    const res = await this.tableDS.submit();
    if (res === undefined) {
      notification.warning({
        message: '请先修改数据！',
        description: '',
      });
    } else if (res && res.failed && res.message) {
      // notification.error({
      //   message: res.message,
      // });
      throw new Error(res);
    } else {
      await this.tableDS.query();
    }
  }

  get buttons(): Buttons[] {
    return [
      TableButtonType.add,
      TableButtonType.delete,
    ];
  }

  get columns(): ColumnProps[] {
    return [
      { name: 'productSkuCode', editor: true, },
      { name: 'title', editor: true, },
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
        name: 'productSpuObject',
        editor: () => <Lov noCache />,
      },
      { name: 'shelfStatus', align: ColumnAlign.center },
      { name: 'statusCode', editor: true, align: ColumnAlign.center },
      { name: 'isExistStock', align: ColumnAlign.right, },
    ];
  }

  render() {
    return (
      <>
        <Header title='ProductSkuListPage' />
        <Content>
          <Table
            queryFieldsLimit={4}
            dataSet={this.tableDS}
            buttons={this.buttons}
            columns={this.columns}
            pagination={{
              showQuickJumper: true,
            }}
          />
        </Content>
      </>
    );
  }

}
