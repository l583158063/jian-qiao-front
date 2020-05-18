import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface ProductSpuListPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class ProductSpuListPage extends Component<ProductSpuListPageProps> {
  render() {
    return (
      <>
        <Header title='商品SPU列表' />
        <Content>
          <p>Hello ProductSpuList</p>
        </Content>
      </>
    );
  }

}
