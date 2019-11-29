import React, { PureComponent } from 'react';
// import { connect } from 'dva';
import { Table } from 'antd';
import style from './index.less'
import SearchContext from './components/SearchContext'
import Operate from './components/Operate'


class Custom extends PureComponent {
    render() {
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];

        const operate = (text, record) => (
            <Operate {...record}/>
        )

        return (

            <div className={style.container} >
                <div className={style.filterContainer}>
                <SearchContext {...this.props} />
                </div>

                <div className={style.tableContainer}>
                    <div className={style.tableItem}>
                        <Table
                            dataSource={dataSource}
                            size="middle"
                            bordered
                            fixedHeader
                        >
                            <Table.Column title="公司名称" align="center" dataIndex="orgName" width={100} />
                            <Table.Column title="法人" align="center" dataIndex="legelPersonName" width={100} />
                            <Table.Column title="法人联系方式" align="center" dataIndex="legalContract" width={100} />
                            <Table.Column title="联系人" align="center" dataIndex="agent" width={100} />
                            <Table.Column title="联系人联系方式" align="left" dataIndex="agentContract" width={100} />
                            <Table.Column title="邮箱" align="center" dataIndex="email" width={100} />
                            <Table.Column title="网址" align="center" dataIndex="website" width={100} />
                            <Table.Column title="网站情况" align="center" dataIndex="sisuation" width={100} />
                            <Table.Column title="成立时间" align="center" dataIndex="foundTime" width={100} />
                            <Table.Column title="公司地址" align="center" dataIndex="address" width={100} />
                            <Table.Column title="经营范围" align="center" dataIndex="businessScope" width={100} />
                            <Table.Column title="资料日期" align="center" dataIndex="createTime" width={100} />
                            <Table.Column title="操作" align="center" render={operate} width={200} />
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Custom;
