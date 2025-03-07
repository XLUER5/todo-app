import { useState } from "react";
import { Form, Input, Button, Typography, Card, Space, Alert } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const LoginForm = () => {
  const { login, loading } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      setError(null);
      const { email } = values;
      const success = await login(email);
      console.log(success);
      if (success === true) {
        navigate("/home");
      } 
    } catch (err) {
      setError("Error al iniciar sesión. Intenta nuevamente más tarde.");
    }
  };

  return (
    <Card className="login-card">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2} className="login-form-title">
            Iniciar Sesión
          </Title>
          <Text type="secondary">
            Ingresa tus credenciales para acceder a la plataforma
          </Text>
        </div>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="Correo electrónico"
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu email",
              },
              {
                type: "email",
                message: "Ingresa un email válido",
              },
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="tu@email.com" 
              size="large" 
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
              icon={<LoginOutlined />}
            >
              Iniciar Sesión
            </Button>
          </Form.Item>
          
        </Form>
        
      </Space>
    </Card>
  );
};

export default LoginForm;