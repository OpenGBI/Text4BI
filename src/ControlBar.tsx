import React from 'react'
import ControlFont from './components/ControlFont'
import ControlSelectedCards from './components/ControlSelectedCards'
import ControlBigGraphSparkLine from './components/ControlBigGraphSparkLine'
import ControlGlobalBoolean from './components/ControlGlobalBoolean'
import ControlSelectedData from './components/ControlSelectedData'

const ControlBar: React.FC = () => (
  <div>
    {/* <ControlGlobalBoolean /> */}
    <ControlFont />
    <ControlSelectedCards />
    <ControlSelectedData />
  </div>
)

export default ControlBar
