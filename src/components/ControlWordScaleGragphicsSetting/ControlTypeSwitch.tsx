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
    switch (typeKey) {
      case 'distributionType':
        setIsdistributionTypeOn(newValue)
        break
      case 'rankType':
        setIsrankTypeOn(newValue)
        break
      case 'proportionType':
        setIsproportionTypeOn(newValue)
        break
      case 'associationType':
        setIsassociationTypeOn(newValue)
        break
      case 'trendType':
        IstrendTypeOn(newValue)
        break
      case 'differenceType':
        setIsdifferenceTypeOn(newValue)
        break
      case 'anomalyType':
        setIsanomalyTypeOn(newValue)
        break
      case 'seasonalityType':
        setIsseasonalityTypeOn(newValue)
        break
      default:
        break
    }
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        [typeKey]: newValue,
      }),
    )
  }

  // 创建一个渲染按钮组的函数
  const renderButtonGroup = (typeKey: string, label: string, value: string) => (
    <Row style={{ paddingTop: 6 }}>
      <Col span={10}>
        <div className='control-label-layer3'>{label}</div>
      </Col>
      <Col span={14}>
        <Button.Group style={{ width: '50%' }}>
          <Button
            type={(value === 'a') ? 'primary' : 'default'}
            onClick={() => handleTypeChange(typeKey, 'a')}
            style={{ width: '50%' }}
          >
            A
          </Button>
          <Button
            type={(value === 'b') ? 'primary' : 'default'}
            onClick={() => handleTypeChange(typeKey, 'b')}
            style={{ width: '50%' }}
          >
            B
          </Button>
        </Button.Group>
      </Col>
    </Row>
  )

  return (
    <div className='control-panel'>
      {renderButtonGroup('distributionType', 'Distribution', isdistributionTypeOn)}
      {renderButtonGroup('rankType', 'Rank', isrankTypeOn)}
      {renderButtonGroup('proportionType', 'Proportion', isproportionTypeOn)}
      {renderButtonGroup('associationType', 'Association', isassociationTypeOn)}
      {renderButtonGroup('trendType', 'Trend', istrendTypeOn)}
      {renderButtonGroup('differenceType', 'Difference', isdifferenceTypeOn)}
      {renderButtonGroup('anomalyType', 'Anomaly', isanomalyTypeOn)}
      {renderButtonGroup('seasonalityType', 'Seasonality', isseasonalityTypeOn)}
    </div>
  )
}

export default ControlTypeSwitch
