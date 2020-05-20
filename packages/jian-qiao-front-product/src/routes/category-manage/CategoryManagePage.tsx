import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { connect } from 'dva';
import { DataSet, Table, Button } from 'choerodon-ui/pro';
import CategoryDS from './CategoryDS';
import { Dispatch } from 'redux';
import { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import { TableButtonType, ColumnAlign } from 'choerodon-ui/pro/lib/table/enum';
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import { Buttons } from 'choerodon-ui/pro/lib/table/Table';
import { Bind } from 'lodash-decorators';
import notification from 'utils/notification';


interface CategoryManagePageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class CategoryManagePage extends Component<CategoryManagePageProps> {
  state = {};

  tableDS = new DataSet({
    ...CategoryDS(),
  });

  get buttons(): Buttons[] {
    return [
      TableButtonType.add,
      TableButtonType.delete,
    ];
  }


  get columns(): ColumnProps[] {
    return [
      { name: 'categoryCode', width: 320, editor: true, },
      { name: 'categoryName', editor: true, },
      { name: 'isActive', editor: true, align: ColumnAlign.center },
    ];
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

  render() {
    return (
      <>
        <Header title='商品目录管理' >
          <Button
            color={ButtonColor.primary}
            onClick={() => this.submit()}
          >
            提交
          </Button>
        </Header>
        <Content>
          <Table
            queryFieldsLimit={3}
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
