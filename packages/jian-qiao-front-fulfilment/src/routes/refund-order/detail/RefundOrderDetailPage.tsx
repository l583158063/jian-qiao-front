import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface RefundOrderDetailPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class RefundOrderDetailPage extends Component<RefundOrderDetailPageProps> {
  render() {
    return (
      <>
        <Header title='RefundOrderDetailPage' />
        <Content>
          <p>Hello RefundOrderDetail</p>
        </Content>
      </>
    );
  }

}
