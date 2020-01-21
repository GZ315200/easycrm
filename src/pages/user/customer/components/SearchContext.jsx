import React, { Component } from 'react';
import { Input, Button, Icon } from 'antd';
import style from '../index.less';
import CustomerButton from './CustomerButton';
import DownloadInfos from './DownloadInfos';
import { PathName } from '../config';

class SearchContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      placeholder: '',
      searchType: 0,
    };
    const { route } = this.props;
    if (route.path === PathName.MENU_INFO) {
      this.state.placeholder = '请输入客户名称/手机';
      this.searchType = 0;
    }
    if (route.path === PathName.MENU_DEMANDS) {
      this.state.placeholder = '请输入客户名称';
      this.searchType = 1;
    }
  }

  onChange = e => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  onClickSearch = () => {
    const { searchValue, searchType } = this.state;
    if (searchType === 0) {
      /**
       * todo
       */
      console.log('search the text for consumer infos');
    }
    if (searchType === 1) {
       /**
       * todo
       */
      console.log('searhc the text for consumer demands');
    }
  };

  render() {
    const { searchValue, placeholder } = this.state;
    return (
      <div>
        <Input
          size="default"
          placeholder={placeholder}
          value={searchValue}
          onChange={this.onChange}
          className={style.filterInput}
        ></Input>
        <Button className={style.filterItemSearch} type="primary" onClick={this.onClickSearch}>
          <Icon type="search" />
          查找
        </Button>
        <CustomerButton {...this.props} />
        <DownloadInfos />
      </div>
    );
  }
}
export default SearchContext;
