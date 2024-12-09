import React, { useState, useEffect } from "react";
import { Table, Space, Button, Card, Tag, Tooltip, Avatar, List, Steps } from "antd";
import { PlusOutlined, EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import WorkflowModal from "./workflow-modal";
import { useSnackbar } from "notistack";
import { format } from 'date-fns';

export const WorkflowPage = () => {
    const [user, setUser] = useState([]);
    const [workflow, setWorkflow] = useState([]);
    const [workflowType, setWorkflowType] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add Workflow");
    const [currentData, setCurrentData] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        initWorkflow();
        initApprover();
        initWorkflowType();
    }, []);

    const initApprover = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
            const data = response.data.data;

            const approverOptions = data.map((user) => ({
                id: user.su_id,
                name: `${user.su_firstname} ${user.su_lastname}`,
                avatarUrl: `https://intranet.tbkk.co.th/employee/img/TBKK/${user.su_username.slice(2)}.jpg`,
            }))
            setUser(approverOptions);
        } catch (error) {
            console.error("Failed to fetch appovers:", error);
        }
    }

    const initWorkflow = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/workflows`);

            const workflowData = response.data.data.map((item, index) => ({
                key: item.id,
                no: index + 1,
                name: item.name,
                status: item.status === "active" ? (
                    <Tag color="success" icon={<CheckCircleOutlined />}>Active</Tag>
                ) : (
                    <Tag color="error" icon={<CloseCircleOutlined />}>Inactive</Tag>
                ),
                step: (
                    <Steps
                        style={{
                            marginTop: 8,
                        }}
                        type="inline"
                        current={0}
                        items={item.approvers.map((approver, approverIndex) => ({
                            title: (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flex: 1,
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        width: '80px',
                                    }}
                                >
                                    <Avatar
                                        src={`https://intranet.tbkk.co.th/employee/img/TBKK/${approver.username.slice(2)}.jpg`}
                                        size={40}
                                    />
                                    <span style={{ marginTop: 8 }}>{approver.name}</span>
                                </div>
                            ),
                            description: `ผู้อนุมัติลำดับที่ ${approverIndex + 1}`,
                            status: 'process'
                        }))}
                    />
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
                                    id: item.id,
                                    workflowType: item.id,
                                    status: item.status,
                                    approvers: item.approvers
                                })}
                            />
                        </Tooltip>
                    </Space>
                ),
                approvers: item.approvers
            }));
            console.log(workflowData);

            setWorkflow(workflowData);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const initWorkflowType = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/workflow-type`);
            console.log(response.data.data);

            setWorkflowType(response.data.data);
        } catch (error) {
            console.log(error);

        }
    }


    const showModal = (workflow = null) => {
        setCurrentData(workflow);
        setModalTitle(workflow ? "Edit Workflow" : "Add Workflow");
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = async (values) => {
        try {
            if (currentData) {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/workflow/${currentData.id}`, values);
                enqueueSnackbar("Workflow updated successfully", { variant: "success" });
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/workflows`, values);
                enqueueSnackbar("Workflow added successfully", { variant: "success" });
            }
            setIsModalVisible(false);
            initWorkflowType();
            initWorkflow();
        } catch (error) {
            console.error("Save failed:", error);
            enqueueSnackbar("Failed to save workflow", { variant: "error" });
        }
    };

    return (
        <>
            <Card
                title="Manage Workflow"
                extra={
                    <Button type="primary" onClick={() => showModal()} icon={<PlusOutlined />}>
                        Add Workflow
                    </Button>
                }
            >
                <Table
                    columns={[
                        { title: 'No', dataIndex: 'no', key: 'no', width: 50 },
                        { title: 'Name', dataIndex: 'name', key: 'name', width: 200 },
                        { title: 'Step', dataIndex: 'step', key: 'step', width: 100 },
                        { title: 'Status', dataIndex: 'status', key: 'status', width: 50 },
                        { title: 'Action', dataIndex: 'action', key: 'action', width: 50 },
                    ]}
                    size="small"
                    scroll={{ x: "max-content" }}
                    dataSource={workflow}
                />
            </Card>

            <WorkflowModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onSave={handleSave}
                initialValues={currentData || { status: "active" }}
                title={modalTitle}
                workflowTypes={workflowType}
                approverOptions={user}
            />
        </>
    );
};
