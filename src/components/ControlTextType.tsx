import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
const items: MenuProps['items'] = [
    {
      key: 'text',
      label: (
        <a target="_blank" onClick={()=>console.log("aaaa")} rel="noopener noreferrer"  >
          text
        </a>
      ),
    },
    {
      key: '2ergthj',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          escape
        </a>
      ),
    },
    {
      key: 'formula',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          formula
        </a>
      ),
    },
    {
      key: 'entity',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          entity
        </a>
      ),
    },
    {
      key: 'custom',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          custom
        </a>
      ),
    },
  ];
type ControlTextTypeProps = {
    onClick:MenuProps['onClick']
}
const ControlTextType :React.FC<ControlTextTypeProps>  = (props) => {
    return (<div>
        <Dropdown menu={{ items:items, onClick: props.onClick }}  placement="bottomLeft" arrow={{ pointAtCenter: true }}>
          <Button >EntityType</Button>
        </Dropdown>
        </div>)
}
export default ControlTextType;
