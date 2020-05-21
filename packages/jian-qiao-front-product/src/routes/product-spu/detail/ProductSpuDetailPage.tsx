import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import ProductSpuDS from '../store/ProductSpuDS';
import { DataSet, Form, TextField, Button, notification, Lov, Select, DateTimePicker } from 'choerodon-ui/pro';
import { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import { Bind } from 'lodash-decorators';
// import notification from 'utils/notification';


interface ProductSpuDetailPageProps {
  dispatch: Dispatch<any>;
  match: any;
}

@connect()
export default class ProductSpuDetailPage extends Component<ProductSpuDetailPageProps> {
  state = {};

  detailDS = new DataSet({
    autoQuery: false,
    ...ProductSpuDS(),
  });

  async componentDidMount() {
    this.detailDS.queryParameter['productSpuCode'] = this.props.match.params.productSpuCode;
    await this.detailDS.query();
  }

  @Bind()
  async handleSave() {
    const validateValue = await this.detailDS.validate(false, false);
    if (!validateValue) {
      notification.error({
        message: '数据校验不通过！',
        description: '',
      });
      return;
    }
    const res = await this.detailDS.submit();
    if (res && res.failed && res.message) {
      notification.error({
        message: res.message,
        description: '',
      });
      throw new Error(res);
    } else if (res === undefined) {
      notification.info({
        message: '当前没有修改数据，不需要保存',
        description: '',
      });
      return;
    }
    return res;
  }

  render() {
    return (
      <>
        <Header
          title='商品SPU详情'
          backPath='/jian-qiao-front-product/product-spu/list'
        >
          <Button
            icon="save"
            color={ButtonColor.primary}
            onClick={this.handleSave}
          >
            保存
          </Button>
        </Header>
        <Content>
          <Form dataSet={this.detailDS} columns={3}>
            <TextField pristine name="productSpuId" />
            <TextField pristine name="productSpuCode" />
            <Lov name="categoryObject" />
            <TextField name="title" />
            <Select name="postStatusCode" />
            <Select name="shelfStatus" />
            <TextField pristine name="salesVolume" />
            <TextField pristine name="customerGrade" />
            <TextField name="taxRate" />
            <TextField name="orderSeq" />
            <Select name="isEnableExpressed" />
            <Select name="isEnablePickedUp" />
            <TextField name="description" />
            <TextField name="recommendation" />
            <TextField name="keyWords" />
            <Select name="isStopSelling" />
            <DateTimePicker pristine name="onlineDate" />
            <DateTimePicker pristine name="offlineDate" />
          </Form>
        </Content>
      </>
    );
  }

}
