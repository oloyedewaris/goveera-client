import React from 'react'
import { Form, Button, Select } from "antd"

const StageForm = ({ setProjectStage, onUpdateStage }) => {
  const { Option } = Select;

  return (
    <Form>
      <Form.Item
        label="Project Stage"
        name="projectStage" >
        <Select
          placeholder="select the project stage"
          onChange={(value) => setProjectStage(value)}>
          <Option value="Proporsal">Proporsal</Option>
          <Option value="Initiation">Initiation</Option>
          <Option value="Planning">Planning</Option>
          <Option value="Execution">Execution</Option>
          <Option value="Closure">Closure</Option>
        </Select>
      </Form.Item>
      <Button type="primary" onClick={onUpdateStage}>Update</Button>
    </Form>
  )
}

export default StageForm
