import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface OrderListPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class OrderListPage extends Component<OrderListPageProps> {
  render() {
    return (
      <>
        <Header title='OrderListPage' />
        <Content>
          <p>Hello OrderList</p>
        </Content>
      </>
    );
  }

}
