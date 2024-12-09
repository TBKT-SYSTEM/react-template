import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Radio, Select, InputNumber } from "antd";

function PermissionModal({
  title,
	show,
	formValue,
  menus,
  form,
  loading,
	onOk,
	onCancel,
  onTypeChange,
  onFinish
}) {
  
  useEffect(() => {
    form.setFieldsValue({
      id: formValue.id,
      mode: formValue.mode,
      type: formValue.type,
      name: formValue.name,
      icon: formValue.icon,
      route: formValue.route,
      order: formValue.order || 1,
      parent: formValue.mode === "addSub" || formValue.mode === "edit" ? formValue.parentId : null,
    });
  }, [formValue]);

  return (
    
    <Modal
        title={title}
        open={show}
        onOk={onOk}
        onCancel={onCancel}
        confirmLoading={loading}
        okText="Save"
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={() => {
            const formValues = form.getFieldsValue();  
            onFinish({ ...formValues, id: formValue.id, mode: formValue.mode });  
          }}
          onFinishFailed={(errorInfo) => {
            console.log("Failed:", errorInfo);
          }}
          autoComplete="off"
        >
          <Form.Item label="Type" name="type">
            <Radio.Group onChange={onTypeChange}>
              <Radio.Button value="main" disabled={formValue.mode === "addSub" || (formValue.mode === "edit" && formValue.type === "sub")}>Main Menu</Radio.Button>
              <Radio.Button value="sub" disabled={formValue.mode === "edit" && formValue.type === "main"}>Sub Menu</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          {formValue.type === "main" && (
            <Form.Item label="Icon" name="icon" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          )}

          {formValue.type === "sub" && (
            <>
              <Form.Item label="Parent" name="parent" rules={[{ required: true }]}>
                <Select placeholder="Please Select" disabled={formValue.mode === "addSub"}>
                  {menus.map((item) => (
                    <Select.Option key={item.sm_id} value={item.sm_id}>
                      {item.sm_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
             
            </>
          )}
           <Form.Item label="Route" name="route" rules={[{ required: formValue.type === "sub" ? true : false }]}>
              <Input />
            </Form.Item>

          <Form.Item label="Order" name="order" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default PermissionModal