import React from 'react'
import ControlFont from './components/ControlFont'
import ControlSelectedCards from './components/ControlSelectedCards'
import ControlBigGraphSparkLine from './components/ControlBigGraphSparkLine'
import ControlGlobalBoolean from './components/ControlGlobalBoolean'
import ControlSelectedData from './components/ControlSelectedData'
import ControlLineHeight from './components/ControlLineHeight'
import ControlAspectRatio from './components/ControlAspectRatio'

const ControlBar: React.FC = () => (
  <div>
    <ControlLineHeight />
    <ControlAspectRatio />
    {/* <ControlBigGraphSparkLine /> */}
    {/* <ControlFont />
    <ControlSelectedCards />
    <ControlSelectedData /> */}
  </div>
)

export default ControlBar
