import React, { Component } from 'react';
// import { connect } from 'dva';
import { Table } from 'antd';
import style from './index.less';
import SearchContext from './components/SearchContext';
import TableOperation from './components/TableOperation';
import { getAllCustomerDemands } from '../../../services/customer';
import { errorHandler } from '../../../utils/request'

class Progress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
    }
  }

  componentDidMount = () => {
    this.getDatasource();
  }

  getDatasource = () => {
    getAllCustomerDemands()
      .then(res => {
        const sourcedata = res.data
        this.setState({
          dataSource: sourcedata,
        })
      })
      .catch(err => {
        errorHandler(err)
      });
  };

  render() {
    const { dataSource } = this.state

    const operate = (text, record) => <TableOperation record={record} {...this.props} />;

    return (
      <div className={style.container}>
        <div className={style.filterContainer}>
          <SearchContext {...this.props} />
        </div>
        <div className={style.tableContainer}>
          <div className={style.tableItem}>
            <Table dataSource={dataSource} size="small" bordered fixedHeader>
              <Table.Column title="客户名称" align="center" dataIndex="name" width={100} />
              <Table.Column title="客户需求" align="center" dataIndex="demands" width={100} />
              <Table.Column title="谈单/开发进度" align="center" dataIndex="process" width={100} />
              <Table.Column title="更新时间" align="center" dataIndex="updateTime" width={100} />
              <Table.Column title="操作" align="center" render={operate} width={50} />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Progress;
