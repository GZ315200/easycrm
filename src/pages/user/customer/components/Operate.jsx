import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import style from '../index.less'


class Operate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultData: {},
        }
        const { record } = this.props
        this.state.resultData = { ...record }
    }

    onEditItem = record => {

    }

    onRemoveItem = record => {

    }

    render() {
        const { resultData } = this.state
        return (
            <div className={style.operateContainer}>
                <Button className={style.operateLeftBtn} type="normal" onClick={this.onEditItem(resultData)}><Icon type="edit" />编辑</Button>
                <Button className={style.operateRightBtn} type="primary" onClick={this.onRemoveItem(resultData.id)}><Icon type="delete" />删除</Button>
            </div>
        )
    }
}

export default Operate;
