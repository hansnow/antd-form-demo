/**
 * create by luqing in 2019/5/10
 * 表单联动问题
 * */
import React, { Component } from 'react'
import { Typography, Row, Col, Card, Form, Input } from 'antd'

function FormItem(props) {
  return (
    <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} {...props} />
  )
}
class MyInput extends Component {
  render() {
    return <Input {...this.props} />
  }
}

const schema = [
  {
    name: 'three',
    fields: {
      top: {
        component: MyInput,
        label: '上联',
        props: {
          placeholder: '请输入上联'
        },
        onChange: (v, setFieldsValue, getFieldValue) => {
          const top = v.target.value
          if (top === '上') {
            setFieldsValue('threeForm', { down: '下' })
          }
          const down = getFieldValue('threeForm', 'down') || ''
          setFieldsValue('fourForm', { heng: `${top}${down}` })
        }
      },
      down: {
        component: MyInput,
        label: '下联',
        props: {
          placeholder: '请输入下联'
        },
        onChange: (v, setFieldsValue, getFieldValue) => {
          const down = v.target.value
          const top = getFieldValue('threeForm', 'top') || ''
          setFieldsValue('fourForm', { heng: `${top}${down}` })
        }
      }
    }
  },
  {
    name: 'four',
    fields: {
      heng: {
        component: MyInput,
        label: '横批',
        props: {
          placeholder: '请输入横批'
        },
        onChange: (v, setFieldsValue) => {
          const value = v.target.value
          const top = value.slice(0, Math.ceil(value.length / 2))
          const down = value.slice(Math.ceil(value.length / 2))
          setFieldsValue('threeForm', { top, down })
        }
      }
    }
  }
]
class AntdForm extends Component {
  render() {
    const {
      antdFormSetFieldsValue,
      antdFormGetFieldValue,
      schema,
      form: { getFieldDecorator }
    } = this.props
    const fields = Object.keys(schema.fields).map(key => {
      const currentSchema = schema.fields[key]
      const Field = currentSchema['component']
      let props = currentSchema.props
      let onChangeConfig = {}
      if (currentSchema.onChange) {
        onChangeConfig = {
          onChange: value =>
            currentSchema.onChange(
              value,
              antdFormSetFieldsValue,
              antdFormGetFieldValue
            )
        }
      }
      return (
        <FormItem label={currentSchema.label}>
          {getFieldDecorator(key, {
            ...onChangeConfig
          })(<Field {...props} />)}
        </FormItem>
      )
    })

    return <Form>{fields}</Form>
  }
}
AntdForm = Form.create()(AntdForm)

class TestOneForm extends Component {
  render() {
    const {
      antdFormSetFieldsValue,
      form: { getFieldDecorator, setFieldsValue, getFieldValue }
    } = this.props
    return (
      <Form>
        <FormItem label="上联">
          {getFieldDecorator('top', {
            onChange: e => {
              const top = e.target.value
              if (top === '上') {
                setFieldsValue({ down: '下' }) // 同一个表单联动
              }
              const down = getFieldValue('down') || ''
              antdFormSetFieldsValue('twoForm', { heng: `${top}${down}` }) // 不同表单联动
            }
          })(<Input placeholder={'请输入上联'} />)}
        </FormItem>
        <FormItem label="下联">
          {getFieldDecorator('down', {
            onChange: e => {
              const down = e.target.value
              const top = getFieldValue('top') || ''
              antdFormSetFieldsValue('twoForm', { heng: `${top}${down}` })
            }
          })(<Input placeholder={'请输入下联'} />)}
        </FormItem>
      </Form>
    )
  }
}
TestOneForm = Form.create()(TestOneForm)

class TestTwoForm extends Component {
  render() {
    const {
      antdFormSetFieldsValue,
      form: { getFieldDecorator }
    } = this.props
    return (
      <Form>
        <FormItem label="横批">
          {getFieldDecorator('heng', {
            onChange: v => {
              const value = v.target.value
              const top = value.slice(0, Math.ceil(value.length / 2))
              const down = value.slice(Math.ceil(value.length / 2))
              antdFormSetFieldsValue('oneForm', { top, down })
            }
          })(<Input placeholder={'请输入横批'} />)}
        </FormItem>
      </Form>
    )
  }
}
TestTwoForm = Form.create()(TestTwoForm)

class Linkage extends Component {
  constructor(props) {
    super(props)
  }
  antdFormSetFieldsValue = (formName, v) => {
    // 表单字段联动的要点： 清楚是在哪个表单(formName)，什么字段需要联动(v)
    // json渲染的方式是可以通过表单项(v)定位到表单(formName), jsx渲染的方式是没有办法做到的
    const formProps = this[formName].props.form
    if (formProps) {
      formProps.setFieldsValue(v)
    }
  }

  antdFormGetFieldValue = (formName, v) => {
    const formProps = this[formName].props.form
    if (formProps) {
      return formProps.getFieldValue(v)
    }
  }
  render() {
    return (
      <div>
        <Typography>
          <Typography.Title>表单联动问题</Typography.Title>
          <Typography.Paragraph>在拆分表单的基础上:</Typography.Paragraph>
          <Typography.Paragraph>
            1. 在同一子表单字段联动（一级、二级、多级联动）
          </Typography.Paragraph>
          <Typography.Paragraph>
            2. 在不同子表单字段联动（一级、二级、多级联动）
          </Typography.Paragraph>
          <Typography.Paragraph>
            3. 同时在不同子表单和相同子表单都有联动（一级、二级、多级联动）
          </Typography.Paragraph>
        </Typography>
        <h4>
          思考:
          表单联动的方式与层级多种多样，是否可以抽象出一个逻辑，能够支持多级联动并且不能形成闭环，同时给联动字段添加明显的标识
        </h4>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="联动逻辑不抽象的情况">
              <p>使用jsx渲染表单:</p>
              <TestOneForm
                antdFormSetFieldsValue={this.antdFormSetFieldsValue}
                wrappedComponentRef={form => {
                  this.oneForm = form
                }}
              />
              <TestTwoForm
                antdFormSetFieldsValue={this.antdFormSetFieldsValue}
                wrappedComponentRef={form => {
                  this.twoForm = form
                }}
              />

              <hr />

              <p>使用json渲染表单:</p>
              {schema.map(s => (
                <AntdForm
                  key={s.name}
                  schema={s}
                  antdFormSetFieldsValue={this.antdFormSetFieldsValue}
                  antdFormGetFieldValue={this.antdFormGetFieldValue}
                  wrappedComponentRef={form => {
                    this[`${s.name}Form`] = form
                  }}
                />
              ))}
              <hr />
              <p>
                jsx相对json比较麻烦的地方：json可以根据表单项定位到表单，而jsx是不能根据表单项定位到表单，所以jsx联动的时候必须明确的知道是针对哪个表单
              </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="联动逻辑抽象的情况" />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Linkage
