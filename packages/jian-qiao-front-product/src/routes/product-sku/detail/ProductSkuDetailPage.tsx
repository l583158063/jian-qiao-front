import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { DataSet, Button, Form, TextField, Lov, Select, NumberField, Table, Upload, Currency } from 'choerodon-ui/pro/lib';
import ProductSkuDS from '../store/ProductSkuDS';
import { ButtonColor, FuncType } from 'choerodon-ui/pro/lib/button/enum';
import { Bind } from 'lodash-decorators';
import notification from 'utils/notification';
import AttributeDS from '../../product-attribute/store/SkuAttributeDS'
import { TableButtonType, ColumnAlign } from 'choerodon-ui/pro/lib/table/enum';
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import { yesOrNoRender } from 'utils/renderer';
import { getAccessToken } from 'utils/utils';
import commonConfig from '@common/config/commonConfig';


interface ProductSkuDetailPageProps {
  dispatch: Dispatch<any>;
  match: any,
  location: any,
  productSkuId: any,
}

@connect()
export default class ProductSkuDetailPage extends Component<ProductSkuDetailPageProps> {
  state = {};

  productSkuId: any;

  attributeDS = new DataSet({
    autoQuery: false,
    ...AttributeDS(),
  });

  detailDS = new DataSet({
    autoQuery: false,
    ...ProductSkuDS(),
  });

  async componentDidMount() {
    this.detailDS.queryParameter['productSkuCode'] = this.props.match.params.productSkuCode;
    this.productSkuId = new URLSearchParams(this.props.location.search).get('productSkuId');
    this.attributeDS.queryParameter = {
      productSkuId: this.productSkuId,
    };
    await this.detailDS.query();
    await this.attributeDS.query();
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

  @Bind()
  async handleAttributeSave() {
    // 为所有记录添加 spuId
    this.attributeDS.forEach(record => record.set('productSkuId', this.productSkuId));

    await this.attributeDS.submit();

    await this.attributeDS.query();
  }

  uploadProps = {
    name: 'imageUrl',
    headers: {
      Authorization: `bearer ${getAccessToken()}`,
    },
    action: `${process.env.API_HOST}${commonConfig.HJQG_BACKEND}/v1/product-skus/image-upload`,
    data: {
      productSkuId: new URLSearchParams(this.props.location.search).get('productSkuId'),
    },
    accept: ['image/*'],
    onUploadSuccess: () => {
      notification.success({
        message: '上传成功',
        description: '',
      });
    },
    onUploadError: () => {
      notification.error({
        message: '上传失败',
        description: '',
      });
    },
  };

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
            <Currency name="price" currency='CNY' />
            <NumberField name="stockLevel" />
            <TextField pristine name="shelfStatus" />
            <Select pristine name="statusCode" />
            {/* <Select name="isEliminatePrice" /> */}
            {/* <Select name="isEliminateStockLevel" /> */}
            <Select name="isCalculateStockLevel" />
            <TextField name="recommendation" />
            <TextField name="habitat" />
            <Select pristine name="isExistStock" />
            <Upload {...this.uploadProps} />
          </Form>
          <Table
            dataSet={this.attributeDS}
            buttons={[
              TableButtonType.add,
              TableButtonType.delete,
              <Button
                key="attribute-sku-save"
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
