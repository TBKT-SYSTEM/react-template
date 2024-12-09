import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Radio, Select, Button, Card, Space, Avatar } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { HolderOutlined } from "@ant-design/icons";  // ใช้ไอคอน drag

const WorkflowModal = ({
  visible,
  onCancel,
  onSave,
  initialValues = {},
  title,
  workflowTypes,
  approverOptions,
}) => {
  const [form] = Form.useForm();
  const [approvers, setApprovers] = useState([{ id: Date.now(), user: null }]);

  useEffect(() => {
    if (!initialValues.id) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    } else {
      form.setFieldsValue(initialValues);
      setApprovers(initialValues.approvers.map((approver) => ({ id: approver.workflow_id, user: approver.id })));
    }
  }, [initialValues, form]);

  const handleAddApprover = () => {
    setApprovers([...approvers, { id: Date.now(), user: null }]);
  };

  const handleRemoveApprover = (id) => {
    setApprovers(approvers.filter((approver) => approver.id !== id));
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedApprovers = Array.from(approvers);
    const [movedItem] = reorderedApprovers.splice(source.index, 1);
    reorderedApprovers.splice(destination.index, 0, movedItem);

    setApprovers(reorderedApprovers);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...values, approvers });
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
          label="WorkflowType"
          name="workflowType"
          rules={[{ required: true }]}
        >
          <Select placeholder="Please Select" disabled={initialValues.id}>
            {workflowTypes.map((item) => (
              <Select.Option key={item.mwt_id} value={item.mwt_id} disabled={item.used > 0 ? true : false}>
                {item.mwt_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Radio.Group>
            <Radio.Button value="active">Active</Radio.Button>
            <Radio.Button value="inactive">Inactive</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Approvers">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="approversList">
              {(provided) => (
                <Space
                  direction="vertical"
                  style={{ width: "100%" }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {approvers.map((approver, index) => (
                    <Draggable key={approver.id} draggableId={approver.id.toString()} index={index}>
                      {(provided) => (
                        <Card
                          size="small"
                          title={`Approver ${index + 1}`}
                          extra={
                            <Space>
                              <Button
                                danger
                                size="small"
                                onClick={() => handleRemoveApprover(approver.id)}
                              >
                                Remove
                              </Button>
                            </Space>
                          }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Space direction="horizontal" align="center" style={{ width: "100%" }}>
                            <HolderOutlined style={{ cursor: "move", marginRight: 8 }} />
                            <Select
                              placeholder="Select Approver"
                              onChange={(value) =>
                                setApprovers((prev) =>
                                  prev.map((item) =>
                                    item.id === approver.id ? { ...item, user: value } : item
                                  )
                                )
                              }
                              value={approver.user}
                              style={{ width: "100%" }}
                            >
                              {approverOptions.map((opt) => (
                                <Select.Option key={opt.id} value={opt.id}>
                                  <Space>
                                    <Avatar src={opt.avatarUrl} size={20} /> {/* ใส่ Avatar */}
                                    {opt.name}
                                  </Space>
                                </Select.Option>
                              ))}
                            </Select>
                          </Space>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Space>
              )}
            </Droppable>
          </DragDropContext>
          <Button type="dashed" onClick={handleAddApprover} block style={{ marginTop: 16 }}>
            Add Approver
          </Button>
          <p style={{ marginTop: 8, fontSize: "12px", color: "gray" }}>
            Drag the approvers to reorder
          </p>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WorkflowModal;
