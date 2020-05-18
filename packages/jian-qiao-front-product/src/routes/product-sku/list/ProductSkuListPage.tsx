import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface ProductSkuListPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class ProductSkuListPage extends Component<ProductSkuListPageProps> {
  render() {
    return (
      <>
        <Header title='ProductSkuListPage' />
        <Content>
          <p>Hello ProductSkuList</p>
        </Content>
      </>
    );
  }

}
