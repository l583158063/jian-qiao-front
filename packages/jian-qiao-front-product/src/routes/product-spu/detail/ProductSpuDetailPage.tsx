import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import ProductSpuDS from '../store/ProductSpuDS';
import AttributeDS from '../../product-attribute/store/SpuAttribute'
import { DataSet, Form, TextField, Button, Lov, Select, DateTimePicker, Table } from 'choerodon-ui/pro';
import { ButtonColor, FuncType } from 'choerodon-ui/pro/lib/button/enum';
import { Bind } from 'lodash-decorators';
import { TableButtonType, ColumnAlign } from 'choerodon-ui/pro/lib/table/enum';
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import { yesOrNoRender } from 'utils/renderer';
import notification from 'utils/notification';


interface ProductSpuDetailPageProps {
  dispatch: Dispatch<any>;
  match: any;
  location: any;
}

@connect()
export default class ProductSpuDetailPage extends Component<ProductSpuDetailPageProps> {
  state = {};

  productSpuId: any;

  attributeDS = new DataSet({
    autoQuery: false,
    ...AttributeDS(),
  });

  detailDS = new DataSet({
    autoQuery: false,
    ...ProductSpuDS(),
  });

  async componentDidMount() {
    this.detailDS.queryParameter['productSpuCode'] = this.props.match.params.productSpuCode;
    this.productSpuId = new URLSearchParams(this.props.location.search).get('productSpuId');
    this.attributeDS.queryParameter = {
      productSpuId: this.productSpuId,
    }
    await this.detailDS.query();
    await this.attributeDS.query();
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

  get columns(): ColumnProps[] {
    return [
      { name: 'attributeCode', editor: true, },
      { name: 'attributeName', editor: true, },
      { name: 'attributeValue', editor: true, },
      {
        name: 'isEnabled',
        editor: true,
        renderer: ({ value }) => yesOrNoRender(value),
        align: ColumnAlign.center,
      },
      { name: 'orderSeq', editor: true, align: ColumnAlign.center, },
      { name: 'remark', editor: true, },
    ];
  }

  @Bind()
  async handleAttributeSave() {
    // 为所有记录添加 spuId
    this.attributeDS.forEach(record => record.set('productSpuId', this.productSpuId));

    await this.attributeDS.submit();

    await this.attributeDS.query();
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
            <TextField pristine name="priceRange" />
            <TextField pristine name="customerGrade" />
            <TextField name="taxRate" />
            <TextField name="orderSeq" />
            <Select name="isEnableExpressed" />
            <Select name="isEnablePickedUp" />
            <TextField name="description" />
            <TextField name="recommendation" />
            {/* <TextField name="keyWords" /> */}
            <Select name="isStopSelling" />
            <DateTimePicker pristine name="onlineDate" />
            <DateTimePicker pristine name="offlineDate" />
          </Form>
          <Table
            dataSet={this.attributeDS}
            buttons={[
              TableButtonType.add,
              TableButtonType.delete,
              <Button
                key="attribute-spu-save"
                icon="save"
                color={ButtonColor.primary}
                funcType={FuncType.flat}
                onClick={() => this.handleAttributeSave()}
              >
                保存所有属性
              </Button>
            ]}
            columns={this.columns}
          />
        </Content>
      </>
    );
  }

}
