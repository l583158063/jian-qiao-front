import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { DataSet, Button, notification, Form, TextField, Lov, Select, NumberField } from 'choerodon-ui/pro/lib';
import ProductSkuDS from '../store/ProductSkuDS';
import { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import { Bind } from 'lodash-decorators';

interface ProductSkuDetailPageProps {
  dispatch: Dispatch<any>;
  match: any,
}

@connect()
export default class ProductSkuDetailPage extends Component<ProductSkuDetailPageProps> {
  state = {};

  detailDS = new DataSet({
    autoQuery: false,
    ...ProductSkuDS(),
  });

  async componentDidMount() {
    this.detailDS.queryParameter['productSkuCode'] = this.props.match.params.productSkuCode;
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
          title='商品SKU详情'
          backPath='/jian-qiao-front-product/product-sku/list'
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
          <Form
            dataSet={this.detailDS}
            columns={3}
          >
            <TextField pristine name="productSkuId" />
            <TextField pristine name="productSkuCode" />
            <Lov name="productSpuObject" />
            <TextField name="title" />
            <NumberField name="price" />
            <NumberField name="stockLevel" />
            <TextField pristine name="shelfStatus" />
            <Select pristine name="statusCode" />
            {/* <Select name="isEliminatePrice" /> */}
            {/* <Select name="isEliminateStockLevel" /> */}
            <Select name="isCalculateStockLevel" />
            <TextField name="recommendation" />
            <TextField name="habitat" />
            <Select pristine name="isExistStock" />
            <TextField name="imageUrl" />
          </Form>
        </Content>
      </>
    );
  }

}
