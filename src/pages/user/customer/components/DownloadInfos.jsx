/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Button, Tooltip } from 'antd';
import style from '../index.less';

export default function DownloadInfos() {
  const onClick = () => {
    console.log('abc');
  }
  return (
    <Tooltip placement="leftTop" title="导出excel文件">
      <Button
        className={style.dowload}
        type="primary"
        shape="circle"
        icon="download"
        onClick={onClick}
      ></Button>
    </Tooltip>
  )
}
