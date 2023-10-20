import { Checkbox, Col, Row } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { systemStateType } from '../types'
import { AppState } from '../store'
import { ChangeSystemSetting } from '../actions/systemAction'

const ControlSelectedCards: React.FC = () => {
  const dispatch = useDispatch()
  const [selectedCards, setSelectedCards] = useState([''])
  const systemSetting: systemStateType = useSelector((state: AppState) => state.system)
  const handleChangeCards = (newSelectedCards: CheckboxValueType[]) => {
    const stringSelectedCards = newSelectedCards.map((item) => String(item))
    setSelectedCards(stringSelectedCards)
    dispatch(
      ChangeSystemSetting({
        ...systemSetting,
        selectedCards: stringSelectedCards,
      }),
    )
  }

  return (
    <Checkbox.Group style={{ width: '100%' }} onChange={handleChangeCards}>
      <Row>
        <Col span={8}>
          <Checkbox value='Card1'>Card1</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value='Card2'>Card2</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value='Card3'>Card3</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value='Card4'>Card4</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value='Card5'>Card5</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>
  )
}

export default ControlSelectedCards
