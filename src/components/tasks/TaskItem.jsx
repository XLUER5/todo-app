import {
  List,
  Typography,
  Tag,
  Button,
  Popconfirm,
  Checkbox,
} from "antd";
import {
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTasks";

const { Text } = Typography;

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();
  const navigate = useNavigate();

  const handleTaskDetail = (e) => {
    e.stopPropagation();
    navigate(`/tasks/${task.id}`);
  };

  const handleDeleteTask = async (e) => {
    if (e) e.stopPropagation();
    await deleteTask(task.id);
  };

  const handleToggleComplete = async (e) => {
    e.stopPropagation();
    await updateTask(task.id);
  };

  return (
    <List.Item
      className="task-item"
      onClick={handleTaskDetail}
      style={{ cursor: "pointer", padding: "16px" }}
      actions={[
        <Popconfirm
          title="¿Estás seguro de eliminar esta tarea?"
          onConfirm={handleDeleteTask}
          okText="Sí"
          cancelText="No"
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => e.stopPropagation()}
            size="small"
          >
            Eliminar
          </Button>
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Checkbox
            checked={task.is_completed}
            onChange={handleToggleComplete}
            onClick={(e) => e.stopPropagation()}
          />
        }
        title={
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <Text
              style={{
                marginRight: 8,
                textDecoration: task.is_completed ? "line-through" : "none",
                fontSize: "1rem",
              }}
              strong
            >
              {task.title}
            </Text>
            {task.is_completed ? (
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Completada
              </Tag>
            ) : (
              <Tag color="processing" icon={<ClockCircleOutlined />}>
                Pendiente
              </Tag>
            )}
          </div>
        }
        description={
          <Text
            style={{
              textDecoration: task.is_completed ? "line-through" : "none",
              color: task.is_completed ? "#00000073" : "inherit",
              fontSize: "0.875rem",
            }}
          >
            {task.description || "Sin descripción"}
          </Text>
        }
      />
    </List.Item>
  );
};

export default TaskItem;