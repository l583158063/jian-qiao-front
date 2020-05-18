import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface RefundOrderListPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class RefundOrderListPage extends Component<RefundOrderListPageProps> {
  render() {
    return (
      <>
        <Header title='RefundOrderListPage' />
        <Content>
          <p>Hello RefundOrderList</p>
        </Content>
      </>
    );
  }

}
