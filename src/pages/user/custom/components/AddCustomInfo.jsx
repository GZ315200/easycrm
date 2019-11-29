import React, { Component } from 'react';
import { Button, Icon } from 'antd';

import { PathName } from '../config'
import style from '../index.less'

class AddCustomInfo extends Component {
    constructor(props) {
        super(props)
        const { match } = this.props
        const { path } = match

        this.state = {
            addInfo: '',
        }

        if (path === PathName.MENU_INFO) {
            this.state.addInfo = '添加客户信息'
        }
        if (path === PathName.MENU_DEMANDS) {
            this.state.addInfo = '添加客户需求进度'
        }
    }

    onOpen = () => {
    }

    render() {
        const { addInfo } = this.state
        return (
            <Button className={style.addItem} type="primary" onClick={this.onOpen}><Icon type="add" />{addInfo}</Button>
        )
    }
}

export default AddCustomInfo;
