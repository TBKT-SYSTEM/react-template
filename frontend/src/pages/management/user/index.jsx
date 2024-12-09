import React, { useState, useEffect } from "react";
import { Table, Space, Button, Card, Tag, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import UserModal from "./user-modal";
import { useSnackbar } from "notistack";
import { format } from 'date-fns';

export const UserPage = () => {
    const [user, setUser] = useState([]);
    const [role, setRole] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add User");
    const [currentUser, setCurrentUser] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        initUser();
        initRole();
    }, []);

    const initUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
            const userData = response.data.data.map((item, index) => ({
                key: item.id,
                name: (<div className="d-flex">
                        <img 
                            className="rounded-circle" 
                            src={item.su_image || '/assets/img/avatars/empty-avatar.png'} 
                            alt="User Avatar" 
                            style={{width: '40px', height: '40px', marginRight: '10px'}} 
                        />
                        <div className="d-flex flex-column">
                            <span>{item.su_firstname} {item.su_lastname}</span>
                            <span className="text-muted">{item.su_email}</span>
                        </div>
                       </div>
                    ),
                role: item.spg_name,
                status: item.su_status === "active" ? (
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
                                    id: item.su_id,
                                    name: `${item.su_firstname} ${item.su_lastname}`,
                                    role: item.spg_id,
                                    status: item.su_status,
                                })}
                            />
                        </Tooltip>
                    </Space>
                )
            }));
            setUser(userData);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const initRole = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles`);
            setRole(response.data.data);
        } catch (error) {
            console.log(error);
            
        }
    }


    const showModal = (user = null) => {
        setCurrentUser(user);
        setModalTitle(user ? "Edit User" : "Add User");
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = async (values) => {
        try {
            if (currentUser) {
                // Update User
                await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${currentUser.id}`, values);
                enqueueSnackbar("User updated successfully", { variant: "success" });
            } else {
                // Add User
                await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, values);
                enqueueSnackbar("User added successfully", { variant: "success" });
            }
            setIsModalVisible(false);
            initUser();
        } catch (error) {
            console.error("Save failed:", error);
            enqueueSnackbar("Failed to save user", { variant: "error" });
        }
    };

    return (
        <>
            <Card
                title="Manage User"
            >
                <Table
                    columns={[
                        { title: 'Name', dataIndex: 'name', key: 'name', width: 200 },
                        { title: 'Role', dataIndex: 'role', key: 'role', width: 200 },
                        { title: 'Status', dataIndex: 'status', key: 'status', width: 100 },
                        { title: 'Action', dataIndex: 'action', key: 'action', width: 100 },
                    ]}
                    size="small"
                    scroll={{ x: "max-content" }}
                    dataSource={user}
                />
            </Card>

            <UserModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onSave={handleSave}
                initialValues={currentUser || { status: "active" }}
                title={modalTitle}
                roles={role}
            />
        </>
    );
};
