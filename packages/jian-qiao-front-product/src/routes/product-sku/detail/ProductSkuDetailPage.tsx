import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface ProductSkuDetailPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class ProductSkuDetailPage extends Component<ProductSkuDetailPageProps> {
  render() {
    return (
      <>
        <Header title='ProductSkuDetailPage' />
        <Content>
          <p>Hello ProductSkuDetail</p>
        </Content>
      </>
    );
  }

}
