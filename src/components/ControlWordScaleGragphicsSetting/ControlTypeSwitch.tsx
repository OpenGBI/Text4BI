import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeWordScaleGraphicsSetting } from '../../actions/wordScaleGraphicsSettingAction'
import { AppState } from '../../store'
import { wordScaleGraphicsSettingStateType } from '../../types'

const types = [
  { key: 'distributionType', label: 'Distribution' },
  { key: 'rankType', label: 'Rank' },
  { key: 'proportionType', label: 'Proportion' },
  { key: 'associationType', label: 'Association' },
  { key: 'trendType', label: 'Trend' },
  { key: 'differenceType', label: 'Difference' },
  { key: 'anomalyType', label: 'Anomaly' },
  { key: 'seasonalityType', label: 'Seasonality' },
]

const ControlTypeSwitch: React.FC = () => {
  const dispatch = useDispatch()
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )

  const [isdistributionTypeOn, setIsdistributionTypeOn] = useState('a')
  const [isrankTypeOn, setIsrankTypeOn] = useState('a')
  const [isproportionTypeOn, setIsproportionTypeOn] = useState('a')
  const [isassociationTypeOn, setIsassociationTypeOn] = useState('a')
  const [istrendTypeOn, IstrendTypeOn] = useState('a')
  const [isdifferenceTypeOn, setIsdifferenceTypeOn] = useState('a')
  const [isanomalyTypeOn, setIsanomalyTypeOn] = useState('a')
  const [isseasonalityTypeOn, setIsseasonalityTypeOn] = useState('a')

  const handleTypeChange = (typeKey: string, newValue: string) => {
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        [typeKey]: newValue,
      }),
    )
  }

  return (
    <div className='control-panel'>
      {types.map((type) => (
        <Row key={type.key} gutter={[16, 16]} justify='start'>
          <Col span={10}>
            <div className='control-label-layer3'>{type.label}</div>
          </Col>
          <Col span={14}>
            <Button.Group style={{ width: '50%', paddingTop: 5 }}>
              <Button
                type='primary'
                onClick={() => handleTypeChange(type.key, 'a')}
                style={{ width: '50%' }}
              >
                A
              </Button>
              <Button
                type='default'
                onClick={() => handleTypeChange(type.key, 'b')}
                style={{ width: '50%' }}
              >
                B
              </Button>
            </Button.Group>
          </Col>
        </Row>
      ))}
    </div>
  )
}

export default ControlTypeSwitch
