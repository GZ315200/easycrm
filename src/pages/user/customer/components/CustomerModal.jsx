import React, { useState } from 'react';
import { Modal } from 'antd';

import CustomerForm from './CustomerForm';

export default function CustomerModal(props) {
  const { addInfo, formType } = props;
  const [viz, setViz] = useState(true);
  const onCancel = () => (
     setViz(false)
  );
  return (
    <Modal width={600} title={addInfo} visible={viz} onCancel={onCancel} footer={null} keyboard>
      <CustomerForm formType={formType} />
    </Modal>
  );
}
