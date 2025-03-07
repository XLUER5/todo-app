import { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  Space,
  Card,
  Typography,
} from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTasks";
import useAuth from "../../hooks/useAuth";
import moment from "moment";

const { Title } = Typography;
const { TextArea } = Input;

const TaskForm = ({ taskId, isEdit = false }) => {
  const {
    createTask,
    updateTask,
    getTaskById,
    currentTask,
    loading,
    clearCurrentTask,
  } = useTasks();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { email } = useAuth();

  useEffect(() => {
    if (isEdit && taskId) {
      const fetchTask = async () => {
        const task = await getTaskById(taskId);
        if (task) {
          const formattedTask = {
            ...task,
          };
          form.setFieldsValue(formattedTask);
        }
      };

      fetchTask();
    } else {
      form.resetFields();
      clearCurrentTask();
    }

    return () => {
      clearCurrentTask();
    };
  }, [taskId, isEdit]);

  const onFinish = async (values) => {
    values.user_email = email;
    const success =
      isEdit && taskId
        ? await updateTask(taskId, values)
        : await createTask(values);

    if (success) {
      navigate("/home");
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <Card className="task-form">
      <Title level={2}>{isEdit ? `Tarea No.${taskId}` : `Nueva Tarea`}</Title>
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
        {isEdit ? (
          <>
            {" "}
            <Form.Item name="is_completed" valuePropName="checked">
              <Checkbox>Completada</Checkbox>
            </Form.Item>
            <Form.Item name="created_at" label="Creada el">
              <Input disabled />
            </Form.Item>
          </>
        ) : null}

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
            >
              {isEdit ? "Actualizar" : "Guardar"}
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
