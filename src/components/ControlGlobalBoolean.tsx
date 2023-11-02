import React, { useState } from 'react'
import { Checkbox, Divider } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeGlobalSetting } from '../actions/GlobalSettingAction'
import { GlobalSettingStateType } from '../types'
import { AppState } from '../store'

const plainOptions = ['boldness', 'underline', 'bulletPoint']
const defaultCheckedList = ['']

const ControlGlobalBoolean: React.FC = () => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList)
  const dispatch = useDispatch()
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const handleGlobalBoolean = (list: CheckboxValueType[]) => {
    setCheckedList(list)
    const stringCheckedList = list.map((item) => String(item))
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        boldness: stringCheckedList.includes('boldness'),
        underline: stringCheckedList.includes('underline'),
        bulletPoint: stringCheckedList.includes('bulletPoint'),
      }),
    )
  }
  return (
    <div>
      <Checkbox.Group options={plainOptions} defaultValue={[]} onChange={handleGlobalBoolean} />
    </div>
  )
}

export default ControlGlobalBoolean
