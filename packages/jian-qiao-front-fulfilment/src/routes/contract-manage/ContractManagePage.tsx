import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface ContractManagePageProps {
  dispatch: Dispatch<any>;
}

@connect()
export default class ContractManagePage extends Component<ContractManagePageProps> {
  render() {
    return (
      <>
        <Header title='ContractManagePage' />
        <Content>
          <p>Hello ContractManage</p>
        </Content>
      </>
    );
  }

}
