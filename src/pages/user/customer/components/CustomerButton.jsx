import React, { Component } from 'react';
import { Button, Icon, Modal } from 'antd';

import { PathName } from '../config';
import CustomerForm from './CustomerForm';
import style from '../index.less';

class CustomerButton extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const { path } = match;

    this.state = {
      addInfo: '',
      visible: false,
      formType: 0,
    };

    if (path === PathName.MENU_INFO) {
      this.state.addInfo = '添加客户信息';
      this.state.formType = 0;
    }
    if (path === PathName.MENU_DEMANDS) {
      this.state.addInfo = '添加客户需求进度';
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

  render() {
    const { addInfo, visible, formType } = this.state;
    return (
      <div className={style.addItem}>
        <Button className={style.addItem} type="primary" onClick={this.onOpen}>
          <Icon type="add" />
          {addInfo}
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
      </div>
    );
  }
}

export default CustomerButton;
