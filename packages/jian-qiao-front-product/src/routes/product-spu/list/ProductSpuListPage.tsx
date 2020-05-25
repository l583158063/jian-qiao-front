import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { connect } from 'dva';
import { DataSet, Table, Button, Axios, Lov } from 'choerodon-ui/pro';
import ProductSpuDS from '../store/ProductSpuDS';
import { Dispatch } from 'redux';
import { ButtonColor, FuncType } from 'choerodon-ui/pro/lib/button/enum';
import { TableButtonType, ColumnAlign, ColumnLock } from 'choerodon-ui/pro/lib/table/enum';
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import { Buttons } from 'choerodon-ui/pro/lib/table/Table';
import { Bind } from 'lodash-decorators';
import notification from 'utils/notification';
import commonConfig from '@common/config/commonConfig';
import { routerRedux } from 'dva/router';
import { getAccessToken } from 'utils/utils';


interface ProductSpuListPageProps {
  dispatch: Dispatch<any>;
  location: any;
}

// const strCategoryObject = 'categoryObject';

@connect()
export default class ProductSpuListPage extends Component<ProductSpuListPageProps> {
  state = {};

  tableDS = new DataSet({
    autoQuery: true,
    ...ProductSpuDS(),
  });

  // async componentDidMount() {
  //   this.tableDS.addEventListener('load', this.handleLoad);
  //   this.tableDS.addEventListener('update', this.handleChange);
  //   // await this.query(this.props.location.search);
  // }

  // componentWillUnmount() {
  //   this.tableDS.removeEventListener('load', this.handleLoad);
  //   this.tableDS.removeEventListener('update', this.handleChange);
  // }

  // @Bind()
  // async query(search) {
  //   const urlSearchParams = new URLSearchParams(search);
  //   const spuId = urlSearchParams.get('productSpuId');
  //   if (spuId) {
  //     // const categoryId = urlSearchParams.get('categoryId');

  //   }
  //   await this.tableDS.query();
  // }

  // @Bind()
  // handleLoad() {
  //   const valuesList = Array<any>();
  //   this.tableDS.toData().forEach(item => {
  //     if (item['productSpuId']) {
  //       valuesList.push(`${item['categoryId']}`);
  //     }
  //   });
  //   this.tableDS.getField(strCategoryObject)?.setLovPara('valuesList', valuesList.join(','));
  // }

  // @Bind()
  // handleChange({ name }) {
  //   if (name === strCategoryObject) {
  //     const valuesList = Array<any>();
  //     this.tableDS.toData().forEach(item => {
  //       if (item['productSpuId']) {
  //         valuesList.push(`${item['categoryId']}`);
  //       }
  //     });
  //     this.tableDS.getField(strCategoryObject)?.setLovPara('valuesList', valuesList.join(','));
  //   }
  // }

  /**
   * 自定义批量上架
   * @param {要操作的数据列表} records
   */
  @Bind()
  async handleOnShelf(isOnShelf) {
    let selecteds = this.tableDS.selected;
    if (selecteds.length === 0) {
      return;
    }
    let productSpuIds = Array<object>();
    selecteds.forEach(record => {
      let spuId = record.get('productSpuId');
      if (spuId) {
        productSpuIds.push({ productSpuId: spuId });
      }
    });

    const accessToken = getAccessToken();
    const headers = {
      Authorization: '',
    };
    if (accessToken) {
      headers.Authorization = `bearer ${accessToken}`;
    }

    const url = `${process.env.API_HOST}${commonConfig.HJQG_BACKEND}/v1/product-spus/on-shelf`;

    const axiosConfig = {
      headers: headers,
      params: {
        isOnShelf: isOnShelf,
      },
    };

    Axios
      .post(url, productSpuIds, axiosConfig)
      .then(response => {
        console.log('response: ' + response);
        notification.success({
          message: '操作成功',
          description: '',
        });
        this.tableDS.query();
      })
      .catch(error => {
        console.log('error: ' + error);
        notification.error({
          message: '操作失败',
          description: '',
        });
      });
  }

  @Bind()
  async handleGotoDetail(record) {
    const productSpuCode = record.get('productSpuCode');
    const productSpuId = record.get('productSpuId');
    const { dispatch } = this.props;
    const pathname = `/jian-qiao-front-product/product-spu/detail/${productSpuCode}`;
    dispatch(
      routerRedux.push({
        pathname,
        search: `?productSpuId=${productSpuId}`,
      })
    );
  }

  get buttons(): Buttons[] {
    return [
      TableButtonType.add,
      TableButtonType.delete,
      <Button
        key="on-shelf"
        icon="pan_tool-o"
        color={ButtonColor.primary}
        funcType={FuncType.flat}
        onClick={() => this.handleOnShelf(1)}
      >
        上架
      </Button>,
      <Button
        key="off-shelf"
        icon="pan_tool-o"
        color={ButtonColor.primary}
        funcType={FuncType.flat}
        onClick={() => this.handleOnShelf(0)}
      >
        下架
      </Button>
    ];
  }

  get columns(): ColumnProps[] {
    return [
      { name: 'productSpuCode', editor: true, },
      { name: 'title', editor: true, },
      {
        name: 'categoryObject',
        editor: () => <Lov noCache />,
      },
      {
        header: '查看',
        renderer: ({ record }) => {
          return (
            <Button
              onClick={() => this.handleGotoDetail(record)}
              icon='link'
              funcType={FuncType.flat}
            >
              详情
            </Button>
          );
        },
        lock: ColumnLock.right,
        align: ColumnAlign.center,
      },
      { name: 'postStatusCode', hidden: true, editor: true, align: ColumnAlign.center },
      { name: 'shelfStatus', align: ColumnAlign.center },
      { name: 'priceRange', align: ColumnAlign.right, },
      { name: 'salesVolume', align: ColumnAlign.right, },
      { name: 'customerGrade', align: ColumnAlign.center, width: 100 },
    ];
  }

  @Bind()
  async submit() {
    const validateValue = await this.tableDS.validate(false, false);
    if (!validateValue) {
      notification.error({
        message: '数据校验不通过！',
        description: '',
      });
      return;
    }
    const res = await this.tableDS.submit();
    if (res === undefined) {
      notification.warning({
        message: '请先修改数据！',
        description: '',
      });
    } else if (res && res.failed && res.message) {
      // notification.error({
      //   message: res.message,
      // });
      throw new Error(res);
    } else {
      await this.tableDS.query();
    }
  }

  render() {
    return (
      <>
        <Header title='商品SPU列表'>
          <Button
            color={ButtonColor.primary}
            onClick={() => this.submit()}
          >
            提交
          </Button>
        </Header>
        <Content>
          <Table
            queryFieldsLimit={4}
            dataSet={this.tableDS}
            buttons={this.buttons}
            columns={this.columns}
            pagination={{
              showQuickJumper: true,
            }}
          />
        </Content>
      </>
    );
  }

}
