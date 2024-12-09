import React, { useState, useEffect } from "react";
import { Table, Space, Button, Form, Tag, Tooltip, Card, Popconfirm } from "antd";
import { PlusOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSnackbar } from "notistack";
import PermissionModalProps from "./permission-modal";

// Table Columns
const columns = [
  { title: "Name", dataIndex: "name", key: "name", width: 300 },
  { title: "Type", dataIndex: "type", key: "type", width: 100 },
  { title: "Icon", dataIndex: "icon", key: "icon", width: 60 },
  { title: "Route", dataIndex: "route", key: "route", width: 200 },
  { title: "Order", dataIndex: "order", key: "order", width: 100 },
  { title: "Status", dataIndex: "status", key: "status", width: 120, align: "center" },
  { title: "Action", dataIndex: "action", key: "action", width: 100 },
];

const defaultPermissionValue = {
	id: "",
	parentId: "",
	name: "",
	route: "",
	icon: "",
	hide: false,
	type: "main",
  mode: "add",
};

export const PermissionPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  
  const [permissions, setPermissions] = useState([]);
  const [form] = Form.useForm();
  
  const onTypeChange = (e) => {
    setPermissionModalProps((prev) => ({ ...prev, formValue: {...prev.formValue, type: e.target.value} }));
  };

  const onFinish = async (values) => {
    setPermissionModalProps((prev) => ({ ...prev, loading: true }));
    try {
      if (values.mode === "add" || values.mode === "addSub") {
        const endpoint = values.type === "main" ? "menus" : "submenus";
        await saveMenu(endpoint); 
      } else if (values.mode === "edit") {
        const endpoint = values.type === "main" ? "menus" : "submenus";
        await updateMenu(endpoint, values.id); 
      }
      
      fetchPermissions(); 
    } catch (error) {
      console.error(error);
    } finally {
      setPermissionModalProps((prev) => ({ ...prev, loading: false }));
    }
  };
  

  const [permissionModalProps, setPermissionModalProps] = useState({
    formValue: {...defaultPermissionValue},
    title: "Add Permission",
    show: false,
    loading: false,
    form: form,
    menus: [],
    onOk: () => {
      form.submit();
    },
    onCancel: () => {
      setPermissionModalProps((prev) => ({ ...prev, show: false }));
      form.resetFields();
    },
    onTypeChange: onTypeChange,
    onFinish: onFinish,
  });

  useEffect(() => {
    fetchPermissions();
    fetchMenuItems();
  }, []);

  // Fetch Permissions from API and group them by menu
  const fetchPermissions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/permissions`);
      console.log(response.data.data);
      
      const groupedData = groupPermissionsByMenu(response.data.data);

      setPermissions(Object.values(groupedData));

    } catch (error) {
      console.error(error);
    }
  };

  const fetchMenuItems = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/menus`);
        setPermissionModalProps((prev) => ({ ...prev, menus: response.data.data }));
    } catch (error) {
        console.error(error);
    }
};

  // Group permissions by menu
  const groupPermissionsByMenu = (data) => {
    return data.reduce((acc, row) => {
      const { sm_id, sm_name, sm_icon, sm_status, ss_id, ss_name, ss_route, ss_status, sm_order, ss_order, sm_route } = row;
  
      // Create menu if not exists
      if (!acc.some(menu => menu.id === sm_id)) {
        const [statusColor, statusText, statusIcon] = sm_status === "active" ? ["success", "Enabled",<CheckCircleOutlined />] : ["error", "Disabled", <CloseCircleOutlined />];
  
        acc.push({
          key: sm_id,
          id: sm_id,
          name: sm_name,
          type: <Tag color="blue">Menu</Tag>,
          route: sm_route,
          icon: <i className={sm_icon}></i>,
          status: <Tag icon={statusIcon} color={statusColor}>{statusText}</Tag>,
          order: sm_order,
          action: renderMenuActions(sm_id),
        });
      }
  
      // Add submenu to menu
      if (ss_id) {
        const [statusColor, statusText, statusIcon] = ss_status === "active" ? ["success", "Enabled", <CheckCircleOutlined />] : ["error", "Disabled", <CloseCircleOutlined />];
        const menu = acc.find(menu => menu.id === sm_id);

        if (menu) {

          if (!menu.children) {
            menu.children = [];
          }
          
          menu.children.push({
            key: `${sm_id}-${ss_id}`,
            id: ss_id,
            parentId: sm_id,
            name: ss_name,
            type: <Tag color="blue">Submenu</Tag>,
            route: ss_route,
            order: ss_order,
            status: <Tag icon={statusIcon} color={statusColor}>{statusText}</Tag>,
            action: renderSubmenuActions(ss_id),
          });
        }
        
      }
  
      return acc;
    }, [])
    .sort((a, b) => a.order - b.order) 
    .map(menu => {
      
      if (menu.children?.length > 0) {
        menu.children = menu.children.sort((a, b) => a.order - b.order);
      }
      return menu;
    });
  };

  // Render actions for menu
  const renderMenuActions = (id) => (
    <Space size="small">
      <Tooltip title="Add submenu">
        <Button shape="circle" type="text" className="text-success" icon={<PlusCircleOutlined />} onClick={() => showModal({ id: id, type: "sub",  mode: "addSub"})} />
      </Tooltip>
      <Tooltip title="Edit">
        <Button shape="circle" type="text" className="text-warning" icon={<EditOutlined />} onClick={() => showModal({ id: id, type: "main", mode: "edit"})} />
      </Tooltip>
      <Popconfirm
        title="Delete permission"
        description="Are you sure to delete this permission?"
        onConfirm={() => {
          deletePermission(id, 'menu');
        }}
        onCancel={() => {}}
        placement="left"
        okText="Yes"
        cancelText="No"
      >
        <Tooltip title="Delete">
          <Button shape="circle" type="text" className="text-danger" icon={<DeleteOutlined />} />
        </Tooltip>
      </Popconfirm>
    </Space>
  );

  // Render actions for submenu
  const renderSubmenuActions = (id) => (
    <Space size="small">
      <Tooltip title="Edit">
        <Button shape="circle" type="text" className="text-warning" icon={<EditOutlined />} onClick={() => showModal({ id: id, type: "sub", mode: "edit"})} />
      </Tooltip>
      <Popconfirm
        title="Delete permission"
        description="Are you sure to delete this permission?"
        onConfirm={() => {
          deletePermission(id, 'submenu');
        }}
        onCancel={() => {}}
        placement="left"
        okText="Yes"
        cancelText="No"
      >
        <Tooltip title="Delete">
          <Button shape="circle" type="text" className="text-danger" icon={<DeleteOutlined />} />
        </Tooltip>
      </Popconfirm>
    </Space>
  );

  const showModal = async ({ id = null, type = null, mode = "add"}) => {
    form.resetFields();

    if (mode === "add") {
      setPermissionModalProps((prev) => ({ ...prev, title: 'Add Permission', formValue: {...defaultPermissionValue}, show: true }));
    }
    
    if (mode === "addSub") {
      setPermissionModalProps((prev) => ({ ...prev, title: 'Add Sub Permission', formValue: {...defaultPermissionValue, type: "sub", parentId: id, mode: mode}, show: true}));
    }

    if (mode === "edit") {
      const permission = await getPermission(id, type === "main" ? "menu" : "submenu");
      
      setPermissionModalProps((prev) => ({ 
        ...prev, 
        title: 'Edit Permission',
        formValue: {
          ...prev.formValue, 
          type: type, 
          mode: mode, 
          id: id, 
          parentId: permission[0]?.parent, 
          name: permission[0]?.name, 
          icon: permission[0]?.icon, 
          order: permission[0]?.ordering,
          status: permission[0]?.status,
          route: permission[0]?.route
        }, 
        show: true
      }));
    }
    
  };

  const getPermission = async (id, type) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/permission/${id}/${type}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  const saveMenu = async (endpoint) => {
    try {
      const formData = form.getFieldsValue();
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/${endpoint}`, formData);
      enqueueSnackbar(response.data.message, { variant: "success" });
      setPermissionModalProps((prev) => ({ ...prev, show: false }));
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const updateMenu = async (endpoint, id) => {
    try {
      const formData = form.getFieldsValue();
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/${endpoint}/${id}`, formData);
      enqueueSnackbar(response.data.message, { variant: "success" });
      setPermissionModalProps((prev) => ({ ...prev, show: false }));
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const deletePermission = async (id, endpoint) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/${endpoint}/${id}`);
      enqueueSnackbar(response.data.message, { variant: "success" });
      fetchPermissions();
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  }

  return (
    <>
      <Card
        title="Manage Permissions"
        extra={
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add
          </Button>
        }
      >
        <Table
          columns={columns}
          size="small"
          scroll={{ x: "max-content" }}
          dataSource={permissions}
        />
      </Card>

      <PermissionModalProps key={permissionModalProps.formValue.id} {...permissionModalProps} />
    </>
  );
};
