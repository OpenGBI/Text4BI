import React, { useState, useEffect } from "react"
import { Select, Space } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { systemStateType, Card } from "../../types"
import { AppState } from "../../store"
import { ChangeSystemSetting } from "../../actions/systemAction"
import { iniData } from "../../utils/iniData1"

const ControlSelectedData: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<Card[]>(iniData)
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>("Data1")
  const dispatch = useDispatch()
  const systemSetting: systemStateType = useSelector((state: AppState) => state.system)

  const handleChangeDataset = (value: string) => {
    // dispatch(
    //   ChangeSystemSetting({
    //     ...systemSetting,
    //     selectedCards: selectedIds,
    //   }),
    // )
    // console.log(`../../public/datas/${value}.json`)
    fetch("http://localhost:5000/changeData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }), // 将 JavaScript 对象转换为 JSON 字符串
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setSelectedDataset(jsonData)
        setSelectedDatasetId(value)
      })
      .catch((error) => {
        console.error("Error posting data:", error)
      })
    // console.log('selectedDataset', selectedDataset)
    // const selectedCardsId: string[] = selectedDataset.map((card) => card.key)

    // dispatch(
    //   ChangeSystemSetting({
    //     ...systemSetting,
    //     dataset: selectedDataset,
    //     selectedCards: selectedCardsId,
    //   }),
    // )
  }
  useEffect(() => {
    // console.log('selectedDataset', selectedDataset)
    const allCardsId: string[] = selectedDataset.map((card) => card.CardName)

    dispatch(
      ChangeSystemSetting({
        ...systemSetting,
        datasetId: selectedDatasetId,
        dataset: selectedDataset,
        selectedCards: allCardsId,
        allCards: allCardsId,
        resetDataset: systemSetting.resetDataset + 1,
      }),
    )
  }, [selectedDataset]) // 仅当selectedDataset发生变化时运行此effect
  return (
    <Space wrap>
      <Select
        defaultValue="Data1"
        style={{ width: 120 }}
        onChange={handleChangeDataset}
        options={[
          { value: "Data1", label: "Data1" },
          { value: "Data2", label: "Data2" },
          { value: "Data3", label: "Data3" },
        ]}
      />
    </Space>
  )
}

export default ControlSelectedData
