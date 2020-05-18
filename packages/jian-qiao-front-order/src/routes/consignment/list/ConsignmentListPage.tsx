import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface ConsignmentListPageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class ConsignmentListPage extends Component<ConsignmentListPageProps> {
  render() {
    return (
      <>
        <Header title='ConsignmentListPage' />
        <Content>
          <p>Hello ConsignmentList</p>
        </Content>
      </>
    );
  }

}
