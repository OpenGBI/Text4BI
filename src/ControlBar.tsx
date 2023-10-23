import React from 'react'
import ControlFont from './components/ControlFont'
import ControlSelectedCards from './components/ControlSelectedCards'
import ControlBigGraphSparkLine from './components/ControlBigGraphSparkLine'
import ControlGlobalBoolean from './components/ControlGlobalBoolean'

const ControlBar: React.FC = () => (
  <div>
    <ControlGlobalBoolean />
  </div>
)

export default ControlBar
