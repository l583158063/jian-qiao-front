import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface ProductSpuDetailPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class ProductSpuDetailPage extends Component<ProductSpuDetailPageProps> {
  render() {
    return (
      <>
        <Header title='ProductSpuDetailPage' />
        <Content>
          <p>Hello ProductSpuDetail</p>
        </Content>
      </>
    );
  }

}
