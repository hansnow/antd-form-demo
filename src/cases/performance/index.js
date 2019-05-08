import React from 'react'
import { Typography, Row, Col, Card, Form, Input } from 'antd'

function FormItem(props) {
  return (
    <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} {...props} />
  )
}

// 未拆分的表单
function CombinedForm({ form }) {
  const { getFieldDecorator } = form
  return (
    <Card title="未拆分">
      {Array(100)
        .fill(0)
        .map((_, _idx) => {
          const idx = String(_idx + 1).padStart(3, '0')
          return (
            <FormItem key={idx} label={`Field${idx}`}>
              {getFieldDecorator(`combined-field-${idx}`)(
                <Input placeholder={`请输入Field${idx}的值`} />
              )}
            </FormItem>
          )
        })}
    </Card>
  )
}
CombinedForm = Form.create()(CombinedForm)

// 包含10个表单域的子表单
function DividedForm({ form, outerIdx }) {
  const { getFieldDecorator } = form
  let fields = []
  Array(10)
    .fill(0)
    .map((_, innerIdx) => {
      const idx = String(outerIdx * 10 + innerIdx + 1).padStart(3, '0')
      fields.push(
        <FormItem key={idx} label={`Field${idx}`}>
          {getFieldDecorator(`divided-field-${idx}`)(
            <Input placeholder={`请输入Field${idx}的值`} />
          )}
        </FormItem>
      )
    })
  return <>{fields}</>
}
DividedForm = Form.create()(DividedForm)

function Performance() {
  return (
    <div>
      <Typography>
        <Typography.Title>表单性能问题</Typography.Title>
        <Typography.Paragraph>
          在表单域较多的情况下，<Typography.Text code>rc-form</Typography.Text>
          存在比较严重的性能问题，主要表现为
          <Typography.Text code>Input</Typography.Text>
          输入框输入卡顿，目前比较可行的解决方式是拆分表单
        </Typography.Paragraph>
        <Typography.Paragraph>
          以下演示的是100个表单域的情况下，不拆分表单和每10个一组进行表单拆分的性能差距
        </Typography.Paragraph>
      </Typography>
      <Row gutter={16}>
        <Col span={12}>
          <CombinedForm />
        </Col>
        <Col span={12}>
          <Card title="每10个一组进行拆分">
            {Array(10)
              .fill(0)
              .map((_, outerIdx) => (
                <DividedForm key={outerIdx} outerIdx={outerIdx} />
              ))}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Performance
