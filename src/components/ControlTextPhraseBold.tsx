// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
// import { Switch, Space } from 'antd';
// import React from 'react';

// const ControlTextPhraseBold: React.FC = () => {
  
//   return (<div>
//     <Space>
//         <div>
//             <span>粗体</span>
//         </div>
//         <Switch
//         checkedChildren={<CheckOutlined />}
//         unCheckedChildren={<CloseOutlined />}
//         defaultChecked
//         />
//     </Space>
    
//   </div>)
// };

// export default ControlTextPhraseBold;

import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log('checked = ', checkedValues);
};

const plainOptions = ['Apple', 'Pear', 'Orange'];

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];
type ControlTextPhraseBooleanProps = {
    onClick: (checkedValues: CheckboxValueType[]) => void
}
const ControlTextPhraseBoolean: React.FC<ControlTextPhraseBooleanProps> = (Props) => (
  <div>
    <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={Props.onClick} />
    
  </div>
);

export default ControlTextPhraseBoolean;


