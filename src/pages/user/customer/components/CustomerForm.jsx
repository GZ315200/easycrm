import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Button, Radio } from 'antd';

export default function CustomerForm(props) {
  const { formType } = props;

  const [datetime, setDataTime] = useState('');
  const [name, setName] = useState('');
  const [visable, setVisable] = useState(false);

  const onDateChange = (date, dateString) => {
    setDataTime(dateString);
  };

  const onSearchData = () => {};

  const onChangeValue = value => {
    setName(value);
  };

  const saveRecord = () => {
    props.onHandleCancel()
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

  const formButtonLayout = { span: 12, offset: 20 };

  const customerInfoForm = () => {
    const type = formType
    return type === 0 ? (<Form {...formItemLayout}>
      <Form.Item label="公司名称" whitespace="true">
        <Input placeholder="请输入公司名称" id="org" />
      </Form.Item>
      <Form.Item label="法人" whitespace="true">
        <Input placeholder="请输入法人信息" id="law" />
      </Form.Item>
      <Form.Item label="法人联系方式" whitespace="true">
        <Input placeholder="请输入法人联系方式" id="lawContract" />
      </Form.Item>
      <Form.Item label="联系人" whitespace="true">
        <Input placeholder="请输入联系人" id="contractor" />
      </Form.Item>
      <Form.Item label="联系人联系方式" whitespace="true">
        <Input placeholder="请输入联系人联系方式" id="phone" />
      </Form.Item>
      <Form.Item label="邮箱" whitespace="true">
        <Input placeholder="请输入邮箱" id="email" />
      </Form.Item>
      <Form.Item label="网址" whitespace="true">
        <Input placeholder="请输入网址" id="website" />
      </Form.Item>
      <Form.Item label="网站情况" whitespace="true">
        <Input placeholder="请输入网站情况" id="situation" />
      </Form.Item>
      <Form.Item label="公司地址" whitespace="true">
        <Input placeholder="请输入公司地址" id="address" />
      </Form.Item>
      <Form.Item label="经营范围" whitespace="true">
        <Input placeholder="请输入经营范围" id="area" />
      </Form.Item>
      <Form.Item label="成立时间" type="date">
        <DatePicker value={datetime} placeholder="请选择成立时间" onChange={onDateChange} />
      </Form.Item>
      <Form.Item wrapperCol={formButtonLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>) : (
      <Form {...formItemLayout}>
      <Form.Item label="客户名称" whitespace="true">
        <Select
          value={name}
          showSearch
          placeholder="请选择客户名称"
          onChange={onChangeValue}
          onSearch={onSearchData}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexof(input.toLowerCase()) > 0
          }
        ></Select>
      </Form.Item>
      <Form.Item label="客户需求" whitespace="true">
        <Input placeholder="请输入客户需求" id="demands" />
      </Form.Item>
      <Form.Item label="谈单/开发进度">
        <Radio.Group name="progressRadio" defaultValue={1}>
          <Radio value={1}>未开始</Radio>
          <Radio value={2}>开发中</Radio>
          <Radio value={3}>协调中</Radio>
          <Radio value={4}>谈单失败</Radio>
          <Radio value={5}>已完成</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item wrapperCol={formButtonLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
    )
  }

  return customerInfoForm()
}
