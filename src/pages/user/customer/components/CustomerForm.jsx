import React, { useState } from 'react';
import { Form, Input, DatePicker } from 'antd';

export default function CustomerForm(props) {
  const { formType } = props;

  const [datetime, setDataTime] = useState('')

  const onDateChange = (date, dateString) => {
     setDataTime(dateString)
  }


  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  const customerInfoForm = (
    <Form {...formItemLayout}>
      <Form.Item label="公司名称">
        <Input placeholder="请输入公司名称" id="org" />
      </Form.Item>
      <Form.Item label="法人">
        <Input placeholder="请输入法人信息" id="law" />
      </Form.Item>
      <Form.Item label="法人联系方式">
        <Input placeholder="请输入法人联系方式" id="lawContract" />
      </Form.Item>
      <Form.Item label="联系人">
        <Input placeholder="请输入联系人" id="contractor" />
      </Form.Item>
      <Form.Item label="联系人联系方式">
        <Input placeholder="请输入联系人联系方式" id="phone" />
      </Form.Item>
      <Form.Item label="邮箱" >
        <Input placeholder="请输入邮箱" id="email" />
      </Form.Item>
      <Form.Item label="网址" >
        <Input placeholder="请输入网址" id="website" />
      </Form.Item>
      <Form.Item label="网站情况" >
        <Input placeholder="请输入网站情况" id="situation" />
      </Form.Item>
      <Form.Item label="成立时间" >
        <DatePicker value={datetime} placeholder="请选择成立时间" onChange={onDateChange}/>
      </Form.Item>
      <Form.Item label="公司地址" >
        <Input placeholder="请输入公司地址" id="address" />
      </Form.Item>
      <Form.Item label="经营范围" >
        <Input placeholder="请输入经营范围" id="area" />
      </Form.Item>
    </Form>
  );
  const customerDemandsForm = (
    <Form {...formItemLayout}>
      <Form.Item></Form.Item>
    </Form>
  );

  return formType === 0 ? { customerInfoForm } : { customerDemandsForm };
}
