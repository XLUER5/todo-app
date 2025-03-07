import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginForm = () => {
  const { login, loading } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email } = values;
    const success = await login(email);
    if (success) {
      navigate("/home");
    }
  };

  return (
    <div className="login-form">
      <Title level={2} className="login-form-title">
        Iniciar Sesión
      </Title>
      <Form form={form} name="login" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu email",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="login-form-button"
          >
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
