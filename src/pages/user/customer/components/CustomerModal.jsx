import React, { useState } from 'react';
import { Modal } from 'antd';

import CustomerForm from './CustomerForm';

export default function CustomerModal(props) {
  const { addInfo, visible, formType } = props;
  const [viz, setViz] = useState(false);
  const onHandleCancel = () => {
    setViz(false)
    props.onCancel(viz)
  }
  return (
    <Modal
      width={600}
      title={addInfo}
      visible={visible}
      onCancel={onHandleCancel}
      footer={null}
      keyboard
    >
      <CustomerForm formType={formType} />
    </Modal>
  );
}
