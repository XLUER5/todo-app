import { useState } from "react";
import { Layout, Menu, Typography, Dropdown, Space, Avatar, theme } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  DownOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const { Header, Content } = Layout;
const { Title } = Typography;

const AppLayout = () => {
  const { email, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Menú desplegable del usuario
  const userMenuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Cerrar Sesión",
      danger: true,
      onClick: handleLogout,
    },
  ];

  // Elementos del menú de navegación
  const navItems = [
    {
      key: "/home",
      icon: <AppstoreOutlined />,
      label: "Tareas",
    },
  ];

  return (
    <Layout className="site-layout" style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          background: token.colorBgContainer,
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div style={{ marginRight: "48px" }}>
            <Title level={4} style={{ margin: 0 }}>
              Todo App
            </Title>
          </div>

          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={navItems}
            style={{ flex: 1, border: "none" }}
            onClick={({ key }) => navigate(key)}
          />

          <div>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: "pointer" }}>
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: token.colorPrimary }}
                />
                <span>{email || "Usuario"}</span>
                <DownOutlined />
              </Space>
            </Dropdown>
          </div>
        </div>
      </Header>

      <Content
        style={{
          padding: "24px",
          margin: "16px",
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
          minHeight: 280,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
