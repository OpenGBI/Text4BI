import React, { useState } from 'react'
import { Checkbox, Divider } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeSystemSetting } from '../../actions/systemAction'
import { systemStateType } from '../../types'
import { AppState } from '../../store'

const plainOptions = ['BigGraph', 'SparkLine']
const defaultCheckedList = ['BigGraph', 'SparkLine']

const ControlBigGraphSparkLine: React.FC = () => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList)
  const dispatch = useDispatch()
  const systemSetting: systemStateType = useSelector((state: AppState) => state.system)
  const handleChangeBigSmallGraph = (list: CheckboxValueType[]) => {
    setCheckedList(list)
    const stringCheckedList = list.map((item) => String(item))
    dispatch(
      ChangeSystemSetting({
        ...systemSetting,
        showBigGraph: stringCheckedList.includes('BigGraph'),
        showSparkLine: stringCheckedList.includes('SparkLine'),
      }),
    )
  }
  return (
    <div>
      <Checkbox.Group
        options={plainOptions}
        defaultValue={['BigGraph', 'SparkLine']}
        onChange={handleChangeBigSmallGraph}
      />
    </div>
  )
}

export default ControlBigGraphSparkLine

// const handleChangeBigSmallGraph = (list: CheckboxValueType[]) => {
//   const dispatch = useDispatch()
//   const systemSetting: systemStateType = useSelector((state: AppState) => state.system)
//   setCheckedList(list)
//   const stringCheckedList = list.map((item) => String(item))
//   dispatch(
//     ChangeSystemSetting({
//       ...systemSetting,
//       showBigGraph: stringCheckedList.includes('BigGraph'),
//       showSparkLine: stringCheckedList.includes('SparkLine'),
//     }),
//   )
// }

// const plainOptions = ['BigGraph', 'SparkLine']

// const App: React.FC = () => (
//   <Checkbox.Group
//     options={plainOptions}
//     defaultValue={['BigGraph', 'SparkLine']}
//     onChange={handleChangeBigSmallGraph}
//   />
// )

// export default App
