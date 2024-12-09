import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Radio, Select } from "antd";

const UserModal = ({
  visible,
  onCancel,
  onSave,
  initialValues = {},
  title,
  roles
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!initialValues.id) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);


  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Save"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Enter name" disabled />
        </Form.Item>
        <Form.Item label="Role" name="role" rules={[{ required: true }]}>
          <Select placeholder="Please Select">
            {roles.map((item) => (
              <Select.Option key={item.spg_id} value={item.spg_id}>
                {item.spg_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Radio.Group buttonStyle="">
            <Radio.Button value="active">Active</Radio.Button>
            <Radio.Button value="inactive">Inactive</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
