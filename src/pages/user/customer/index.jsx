import React, { Component } from 'react';
// import { connect } from 'dva';
import { Table } from 'antd';
import style from './index.less';
import SearchContext from './components/SearchContext';
import TableOperation from './components/TableOperation';
import { getAllCustomerInfo } from '../../../services/customer';
import { errorHandler } from '../../../utils/request';


class Custom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
    }
  }

  componentDidMount = () => {
    this.getConsumerInfo()
  }

  getConsumerInfo = () => {
    getAllCustomerInfo().then(res => {
      const realData = res.data;
      this.setState({
        dataSource: realData,
      })
    }).catch(error => {
      errorHandler(error)
    })
  }

  render() {
    const { dataSource } = this.state;

    const operate = (text, record) => <TableOperation record={record} {...this.props} />;

    return (
      <div className={style.container}>
        <div className={style.filterContainer}>
          <SearchContext {...this.props} />
        </div>

        <div className={style.tableContainer}>
          <div className={style.tableItem}>
            <Table dataSource={dataSource} size="small" bordered fixedHeader>
              <Table.Column title="公司名称" align="center" dataIndex="orgName" width={100} />
              <Table.Column title="法人" align="center" dataIndex="legelPersonName" width={100} />
              <Table.Column
                title="法人联系方式"
                align="center"
                dataIndex="legalContract"
                width={100}
              />
              <Table.Column title="联系人" align="center" dataIndex="agent" width={100} />
              <Table.Column
                title="联系人联系方式"
                align="left"
                dataIndex="agentContract"
                width={100}
              />
              <Table.Column title="邮箱" align="center" dataIndex="email" width={100} />
              <Table.Column title="网址" align="center" dataIndex="website" width={100} />
              <Table.Column title="网站情况" align="center" dataIndex="sisuation" width={100} />
              <Table.Column title="成立时间" align="center" dataIndex="foundTime" width={100} />
              <Table.Column title="公司地址" align="center" dataIndex="address" width={100} />
              <Table.Column title="经营范围" align="center" dataIndex="businessScope" width={100} />
              <Table.Column title="资料日期" align="center" dataIndex="createTime" width={100} />
              <Table.Column title="操作" align="center" render={operate} width={150} />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Custom;
