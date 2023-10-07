import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
const items: MenuProps['items'] = [
    {
      key: 'metric_name',
      label: (
        <a target="_blank" onClick={()=>console.log("aaaa")} rel="noopener noreferrer"  >
          metric_name
        </a>
      ),
    },
    {
      key: 'metric_value',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          metric_value
        </a>
      ),
    },
    {
      key: 'other_metric_value',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          other_metric_value
        </a>
      ),
    },
    {
      key: 'contribute_ratio',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          contribute_ratio
        </a>
      ),
    },
    {
      key: 'delta_value',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          delta_value
        </a>
      ),
    },
    {
      key: 'ratio_value',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          ratio_value
        </a>
      ),
    },
    {
      key: 'trend_desc',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          trend_desc
        </a>
      ),
    },
    {
      key: 'dim_value',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          dim_value
        </a>
      ),
    },
    {
      key: 'time_desc',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          time_desc
        </a>
      ),
    },
    {
      key: 'proportion',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          proportion
        </a>
      ),
    },
  ];
type ControlTextTypeProps = {
    onClick:MenuProps['onClick']
}
const ControlEntityType :React.FC<ControlTextTypeProps>  = (props) => {
    return (<div>
        <Dropdown menu={{ items:items, onClick: props.onClick }}  placement="bottomLeft" arrow={{ pointAtCenter: true }}>
          <Button >Background</Button>
        </Dropdown>
        </div>)
}
export default ControlEntityType;
