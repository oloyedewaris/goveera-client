import React from 'react'
import { Spin } from 'antd'
import "./Spinner.less"

function Spinner() {
  return (
    <div className="spinner">
      <Spin />
    </div>
  )
}

export default Spinner
