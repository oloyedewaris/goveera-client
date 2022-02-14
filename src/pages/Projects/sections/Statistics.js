import React from 'react'
import { Row, Col, Card, Statistic } from "antd"
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons"

const Statistics = ({ project }) => {
  let supPercent;
  let oppPercent;
  const supporters = project.supporters.length;
  const opposers = project.opposers.length;
  const total = supporters + opposers;
  if (supporters !== 0 || opposers !== 0) {
    supPercent = (supporters / total) * 100;
    oppPercent = (opposers / total) * 100;
  } else {
    supPercent = 0;
    oppPercent = 0;
  }
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Support"
              value={supPercent}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Oppose"
              value={oppPercent}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Statistics
