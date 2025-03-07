import { useEffect } from "react";
import { List, Button, Pagination, Space, Typography, Spin, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTasks";
import TaskItem from "./TaskItem";

const { Title } = Typography;

const TaskList = () => {
  const { tasks, loading, pagination, getTasks } = useTasks();

  const navigate = useNavigate();

  useEffect(() => {
    getTasks(1);
  }, []);

  const handlePageChange = (page, pageSize) => {
    getTasks(page, pageSize);
  };

  const handleAddTask = () => {
    navigate("/tasks/new");
  };

  return (
    <div className="task-list-container">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={2}>Mis Tareas</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddTask}
            size="large"
          >
            Nueva Tarea
          </Button>
        </div>

        <Spin spinning={loading}>
          {tasks.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={tasks}
              renderItem={(task) => <TaskItem task={task} />}
            />
          ) : (
            <Empty
              description="No hay tareas disponibles"
              style={{ margin: "40px 0" }}
            />
          )}
        </Spin>

        {pagination.total > 0 && (
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
            showSizeChanger
            showTotal={(total) => `Total: ${total} tareas`}
            style={{ marginTop: 16, textAlign: "right" }}
          />
        )}
      </Space>
    </div>
  );
};

export default TaskList;
