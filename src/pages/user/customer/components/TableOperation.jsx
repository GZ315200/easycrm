import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import style from '../index.less';
import CustomerModal from './CustomerModal';
import { PathName } from '../config';

class TableOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultData: {},
      addInfo: '',
      visible: false,
      formType: 0,
    };

    const { record, match } = this.props;
    const { path } = match;

    this.state.resultData = { ...record };
    if (path === PathName.MENU_INFO) {
      this.state.addInfo = '修改客户信息';
      this.state.formType = 0;
    }
    if (path === PathName.MENU_DEMANDS) {
      this.state.addInfo = '修改客户需求进度';
      this.state.formType = 1;
    }
  }

  onOpen = () => {
    this.setState({
      visible: true,
    });
  };

  onCancel = value => {
    this.setState({
      visible: value,
    });
  };

  onRemoveItem = record => {
    console.log(record);
  };

  render() {
    const { resultData, addInfo, visible, formType } = this.state;
    return (
      <div className={style.operateContainer}>
        <Button className={style.operateLeftBtn} type="normal" size="small" onClick={this.onOpen}>
          <Icon type="edit" />
          编辑
        </Button>
        <CustomerModal
          addInfo={addInfo}
          visible={visible}
          formType={formType}
          onCancel={this.onCancel}
        />
        <Button
          className={style.operateRightBtn}
          size="small"
          type="primary"
          onClick={this.onRemoveItem(resultData.id)}
        >
          <Icon type="delete" />
          删除
        </Button>
      </div>
    );
  }
}

export default TableOperation;
