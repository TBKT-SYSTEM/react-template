import React, { useState, useEffect } from "react";
import { Table, Space, Button, Card, Tag, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import RoleModal from "./role-modal";
import { useSnackbar } from "notistack";
import { format } from 'date-fns';

export const RolePage = () => {
    const [role, setRole] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add Role");
    const [currentRole, setCurrentRole] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        initRole();
        fetchPermissions();
    }, []);

    const initRole = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles`);
            const roleData = response.data.data.map((item, index) => ({
                key: item.id,
                no: index + 1,
                name: item.spg_name,
                updateDate: item.spg_updated_at ? format(new Date(item.spg_updated_at), 'dd-MM-yyyy HH:mm:ss') : "-",
                status: item.spg_status === "active" ? (
                    <Tag color="success" icon={<CheckCircleOutlined />}>Active</Tag>
                ) : (
                    <Tag color="error" icon={<CloseCircleOutlined />}>Inactive</Tag>
                ),
                action: (
                    <Space>
                        <Tooltip title="Edit">
                            <Button
                                type="text"
                                className="text-warning"
                                shape="circle"
                                icon={<EditOutlined />}
                                onClick={() => showModal({
                                    id: item.spg_id,
                                    name: item.spg_name,
                                    status: item.spg_status,
                                    permissions: item.permissions
                                })}
                            />
                        </Tooltip>
                    </Space>
                )
            }));
            setRole(roleData);
        } catch (error) {
            console.error("Failed to fetch roles:", error);
        }
    };

    const fetchPermissions = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/permissions`);
    
          const permissions = groupDataBySmId(response.data.data)
          console.log(permissions);
          
          setPermissions(permissions);
          
        } catch (error) {
          console.error(error);
        }
      };

      const groupDataBySmId = (data) => {
        const result = [];
      
        data.forEach(item => {
          const existingGroup = result.find(group => group.id === item.sm_id);
      
          if (!existingGroup) {
            result.push({
              id: item.sm_id,
              name: item.sm_name,
              children: [],
            });
          }
      
          if (item.ss_id) {
            const group = result.find(group => group.id === item.sm_id);
            group.children.push({
              id: `${item.sm_id}-${item.ss_id}`,
              name: item.ss_name,
              children: [],
            });
          }
        });
      
        return result;
      };

    const showModal = (role = null) => {
        setCurrentRole(role);
        setModalTitle(role ? "Edit Role" : "Add Role");
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = async (values, permissions) => {
        try {
            values.permissions = permissions;

            if (currentRole) {
                // Update Role
                await axios.put(`${import.meta.env.VITE_API_URL}/api/roles/${currentRole.id}`, values);
                enqueueSnackbar("Role updated successfully", { variant: "success" });
            } else {
                // Add Role
                await axios.post(`${import.meta.env.VITE_API_URL}/api/roles`, values);
                enqueueSnackbar("Role added successfully", { variant: "success" });
            }
            setIsModalVisible(false);
            initRole();
        } catch (error) {
            console.error("Save failed:", error);
            enqueueSnackbar("Failed to save role", { variant: "error" });
        }
    };

    return (
        <>
            <Card
                title="Manage Role"
                extra={
                    <Button type="primary" onClick={() => showModal()} icon={<PlusOutlined />}>
                        Add
                    </Button>
                }
            >
                <Table
                    columns={[
                        { title: 'No', dataIndex: 'no', key: 'no', width: 20 },
                        { title: 'Name', dataIndex: 'name', key: 'name', width: 200 },
                        { title: 'Update Date', dataIndex: 'updateDate', key: 'updateDate', width: 200 },
                        { title: 'Status', dataIndex: 'status', key: 'status', width: 100 },
                        { title: 'Action', dataIndex: 'action', key: 'action', width: 100 },
                    ]}
                    size="small"
                    scroll={{ x: "max-content" }}
                    dataSource={role}
                />
            </Card>

            <RoleModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onSave={handleSave}
                initialValues={currentRole || { status: "active" }}
                title={modalTitle}
                permissions={permissions}
            />
        </>
    );
};
