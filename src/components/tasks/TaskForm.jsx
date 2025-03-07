import { Form, Input, Button, Space, Card, Typography } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTasks";
import useAuth from "../../hooks/useAuth";

const { Title } = Typography;
const { TextArea } = Input;

const TaskForm = () => {
  const { createTask, loading } = useTasks();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { email } = useAuth();

  const onFinish = async (values) => {
    values.user_email = email;
    const success = await createTask(values);

    if (success) {
      navigate("/home");
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <Card className="task-form">
      <Title level={2}>Nueva Tarea</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          completed: false,
        }}
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[
            {
              required: true,
              message: "Por favor ingresa un título para la tarea",
            },
          ]}
        >
          <Input placeholder="Título de la tarea" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripción"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <TextArea placeholder="Descripción de la tarea" rows={4} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
            >
              Guardar
            </Button>
            <Button onClick={handleCancel} icon={<CloseOutlined />}>
              Cancelar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm;
