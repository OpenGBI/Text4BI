import React from "react"
import { DatePickerProps, DatePicker, Space } from "antd"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { useDispatch, useSelector } from "react-redux"
import { Metadata, systemStateType } from "../../types"
import { ChangeSystemSetting } from "../../actions/systemAction"
import { AppState } from "../../store"

type param4FilterType = {
  startTime: string
  endTime: string
}
type setParamFunc4FilterType = {
  setStartTime: (time: string) => void
  setEndTime: (time: string) => void
}
dayjs.extend(customParseFormat)
const dateFormat = "YYYY-MM-DD"

type typeSelectorTimeProps = {
  defaultSelection: string
  param4Filter: param4FilterType
  setParamFunc: setParamFunc4FilterType
  metadata: Metadata
}
const SelectorTime: React.FC<typeSelectorTimeProps> = ({
  defaultSelection,
  param4Filter,
  setParamFunc,
  metadata,
}) => {
  console.log()
  const dispatch = useDispatch()
  const systemStateSetting: systemStateType = useSelector((state: AppState) => state.system)
  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (metadata.paramFilter !== "startTime" && metadata.paramFilter !== "endTime") return
    if (metadata.paramFilter === "startTime") {
      setParamFunc.setStartTime(dateString)
      fetch("http://localhost:5000/distribution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startTime: dateString, endTime: param4Filter.endTime }), // 将name参数转换为JSON字符串
      })
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((data) => {
          console.log(data)
          dispatch(
            ChangeSystemSetting({
              ...systemStateSetting,
              dataset: data,
            }),
          )
        })
        .catch((error) => console.error("Error:", error))
    }
    if (metadata.paramFilter === "endTime") {
      setParamFunc.setEndTime(dateString)
    }
  }
  return (
    <Space direction="vertical">
      <DatePicker defaultValue={dayjs(defaultSelection, dateFormat)} onChange={handleOnChange} />
    </Space>
  )
}

export default SelectorTime
