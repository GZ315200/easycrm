import React, { Component } from 'react';
import { Button, Icon, Modal } from 'antd';

import { PathName } from '../config';
import style from '../index.less';

class CustomerButton extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const { path } = match;

    this.state = {
      addInfo: '',
      visible: false,
    };

    if (path === PathName.MENU_INFO) {
      this.state.addInfo = '添加客户信息';
    }
    if (path === PathName.MENU_DEMANDS) {
      this.state.addInfo = '添加客户需求进度';
    }
  }

  onOpen = () => {};

  onCancel = () => {};

  render() {
    const { addInfo, visible } = this.state;
    return (
      <div className={style.addItem}>
        <Button className={style.addItem} type="primary" onClick={this.onOpen}>
          <Icon type="add" />
          {addInfo}
        </Button>
        <Modal title={addInfo} visible={visible} onCancel={this.onCancel}></Modal>
      </div>
    );
  }
}

export default CustomerButton;
