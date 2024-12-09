import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Radio, Tree } from "antd";

const RoleModal = ({ 
    visible, 
    onCancel, 
    onSave, 
    initialValues = {}, 
    title,
    permissions
}) => {
    const [form] = Form.useForm();
    const [checkedKeys, setCheckedKeys] = useState([]);

    useEffect(() => {
        if (!initialValues.id) {
            form.resetFields();
            form.setFieldsValue(initialValues);
            setCheckedKeys([]);
        } else {
            form.setFieldsValue(initialValues);
            setCheckedKeys(flattenData(initialValues.permissions))
        }
    }, [initialValues, form]); 

    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
    };

    const flattenData = (data) => {
        const result = [];
        data.forEach(item => {
          if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
              result.push(child.id);
            });
          } else {
            result.push(item.id); 
          }
        });
        return result;
      };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onSave(values, groupData(checkedKeys));
        } catch (error) {
            console.error("Validation Failed:", error);
        }
    };

    const groupData = (data) => {
        const result = [];
      
        data.forEach((item) => {
          if (typeof item === "number") {
            const existingGroup = result.find(group => group.id === item);
            if (!existingGroup) {
              result.push({ id: item, children: [] });
            }
          } else if (typeof item === "string" && item.includes("-")) {
            const parts = item.split("-");
            if (parts.length === 2) {
              const smId = parseInt(parts[0]); 
              const ssId = parseInt(parts[1]);
      
              const group = result.find(group => group.id === smId);
      
              if (!group) {
                result.push({ id: smId, children: [{ id: ssId }] });
              } else {
                group.children.push({ id: ssId });
              }
            }
          }
        });
      
        return result;
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
                    label="Role Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter role name" }]}
                >
                    <Input placeholder="Enter role name" />
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
                
                <Form.Item label="Permission" name="permission">
                    <Tree
						checkable
                        checkedKeys={checkedKeys}
						treeData={permissions}
						fieldNames={{
							key: "id",
							children: "children",
							title: "name",
						}}
                        onCheck={onCheck}
					/>
				</Form.Item>
            </Form>
        </Modal>
    );
};

export default RoleModal;
