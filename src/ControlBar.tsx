import React from 'react'
import ControlFont from './components/ControlFont'
import ControlSelectedCards from './components/ControlSelectedCards'

const ControlBar: React.FC = () => (
  <div>
    <ControlFont />
    <ControlSelectedCards />
  </div>
)

export default ControlBar
