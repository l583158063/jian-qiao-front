import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface OrderDetailPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class OrderDetailPage extends Component<OrderDetailPageProps> {
  render() {
    return (
      <>
        <Header title='OrderDetailPage' />
        <Content>
          <p>Hello OrderDetail</p>
        </Content>
      </>
    );
  }

}
