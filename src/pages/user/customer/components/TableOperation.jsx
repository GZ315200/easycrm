import React, { Component } from 'react';
import { Button, Icon, Modal } from 'antd';
import style from '../index.less';
import CustomerForm from './CustomerForm';
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

  onCancel = () => {
    this.setState({
      visible: false,
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
        <Modal
          width={600}
          title={addInfo}
          visible={visible}
          onCancel={this.onCancel}
          footer={null}
          keyboard
        >
          <CustomerForm formType={formType} />
        </Modal>
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
