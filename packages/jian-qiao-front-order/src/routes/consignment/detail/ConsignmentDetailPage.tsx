import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface ConsignmentDetailPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class ConsignmentDetailPage extends Component<ConsignmentDetailPageProps> {
  render() {
    return (
      <>
        <Header title='ConsignmentDetailPage' />
        <Content>
          <p>Hello ConsignmentDetail</p>
        </Content>
      </>
    );
  }

}
