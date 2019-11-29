import React, { Component } from 'react';
import { Input, Button, Icon } from 'antd'
import style from '../index.less'
import AddCustomInfo from './AddCustomInfo'
import { PathName } from '../config'


class SearchContext extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: null,
            placeholder: '',
        }
        const { route } = this.props
        if (route.path === PathName.MENU_INFO) {
            this.state.placeholder = '请输入客户名称/手机'
        }
        if (route.path === PathName.MENU_DEMANDS) {
            this.state.placeholder = '请输入客户名称'
        }
    }

    onChange = value => {
        this.setState({
            searchValue: value,
        })
    }

    onClickSearch = () => {
        const { searchValue } = this.state
    }

    render() {
        const { searchValue, placeholder } = this.state
        return (
            <div>
                <Input size="default" placeholder={placeholder} value={searchValue} onChange={this.onChange} className={style.filterInput}></Input>
                <Button className={style.filterItemSearch} type="primary" onClick={this.onClickSearch} ><Icon type="search" />查找</Button>
                <AddCustomInfo {...this.props} />
            </div>
        );
    }
}
export default SearchContext;
