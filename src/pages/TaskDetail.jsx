import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Tag,
  Button,
  Space,
  Descriptions,
  Spin,
  Divider,
  Popconfirm,
  Row,
  Col,
  Avatar,
  Progress,
  Badge,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import moment from "moment";
import useTasks from "../hooks/useTasks";

const { Title, Text, Paragraph } = Typography;

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, currentTask, loading, deleteTask, updateTask } =
    useTasks();

  useEffect(() => {
    if (id) {
      getTaskById(id);
    }
  }, [id]);

  const handleBack = () => {
    navigate("/home");
  };

  const handleDelete = async () => {
    const success = await deleteTask(id);
    if (success) {
      navigate("/home");
    }
  };

  const handleToggleComplete = async () => {
    if (currentTask) {
      await updateTask(id);
      getTaskById(id);
    }
  };

  const handleEdit = () => {
    navigate(`/task/edit/${id}`);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 200px)",
        }}
      >
        <Spin size="large"/>
      </div>
    );
  }

  if (!currentTask) {
    return (
      <Card className="task-not-found-card">
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <FileTextOutlined
            style={{ fontSize: 72, color: "#d9d9d9", marginBottom: 24 }}
          />
          <Title level={3}>Tarea no encontrada</Title>
          <Paragraph type="secondary">
            La tarea que buscas no existe o ha sido eliminada
          </Paragraph>
          <Button
            type="primary"
            onClick={handleBack}
            icon={<ArrowLeftOutlined />}
            size="large"
            style={{ marginTop: 16 }}
          >
            Volver al inicio
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div
      className="task-detail-container"
      style={{ maxWidth: 900, margin: "20px auto" }}
    >
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Button
            type="link"
            onClick={handleBack}
            icon={<ArrowLeftOutlined />}
            style={{ padding: 0, fontSize: 16 }}
          >
            Volver a la lista
          </Button>
        </Col>

        <Col span={24}>
          <Card
            className="task-detail-card"
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Row gutter={[24, 24]}>
              {/* Cabecera con título y estado */}
              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <Badge>
                      <Title
                        level={2}
                        style={{ marginBottom: 8, maxWidth: 600 }}
                      >
                        {currentTask.title}
                      </Title>
                    </Badge>
                  </div>

                  <Space>
                    <Popconfirm
                      title="¿Estás seguro de eliminar esta tarea?"
                      description="Esta acción no se puede deshacer"
                      onConfirm={handleDelete}
                      okText="Sí, eliminar"
                      cancelText="Cancelar"
                      placement="bottomRight"
                      okButtonProps={{ danger: true }}
                    >
                      <Button danger icon={<DeleteOutlined />}>
                        Eliminar
                      </Button>
                    </Popconfirm>
                  </Space>
                </div>
              </Col>

              {/* Separador */}
              <Col span={24}>
                <Divider style={{ margin: "8px 0 16px" }} />
              </Col>

              {/* Contenido principal */}
              <Col span={24}>
                <Row gutter={[24, 24]}>
                  {/* Descripción */}
                  <Col xs={24} md={16}>
                    <Card
                      title={
                        <span>
                          <FileTextOutlined /> Descripción
                        </span>
                      }
                      className="description-card"
                      style={{ borderRadius: 8 }}
                    >
                      {currentTask.description ? (
                        <Paragraph
                          style={{ fontSize: 16, whiteSpace: "pre-line" }}
                        >
                          {currentTask.description}
                        </Paragraph>
                      ) : (
                        <Paragraph
                          type="secondary"
                          style={{ textAlign: "center" }}
                        >
                          No hay descripción disponible
                        </Paragraph>
                      )}
                    </Card>
                  </Col>

                  {/* Detalles y progreso */}
                  <Col xs={24} md={8}>
                    <Space
                      direction="vertical"
                      style={{ width: "100%" }}
                      size="large"
                    >
                      <Card
                        title="Estado"
                        className="status-card"
                        style={{ borderRadius: 8 }}
                      >
                        <div style={{ textAlign: "center" }}>
                          <div
                            style={{
                              fontSize: 24,
                              fontWeight: "bold",
                              color: currentTask.is_completed
                                ? "#52c41a"
                                : "#1890ff",
                            }}
                          >
                            {currentTask.is_completed
                              ? "Tarea Completada"
                              : "Tarea Pendiente"}
                          </div>
                          <div style={{ marginTop: 16 }}>
                            <Button
                              type={
                                currentTask.is_completed ? "default" : "primary"
                              }
                              onClick={handleToggleComplete}
                              icon={
                                currentTask.is_completed ? (
                                  <ClockCircleOutlined />
                                ) : (
                                  <CheckCircleOutlined />
                                )
                              }
                              block
                            >
                              {currentTask.is_completed
                                ? "Marcar como pendiente"
                                : "Marcar como completada"}
                            </Button>
                          </div>
                        </div>
                      </Card>

                      <Card
                        title="Información adicional"
                        className="info-card"
                        style={{ borderRadius: 8 }}
                      >
                        <Descriptions
                          column={1}
                          size="small"
                          layout="horizontal"
                        >
                          <Descriptions.Item label="ID de tarea">
                            <Text>{id}</Text>
                          </Descriptions.Item>
                          <Descriptions.Item label="Creada">
                            {moment(currentTask.created_at).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </Descriptions.Item>
                          {currentTask.updated_at &&
                            currentTask.updated_at !==
                              currentTask.created_at && (
                              <Descriptions.Item label="Actualizada">
                                {moment(currentTask.updated_at).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </Descriptions.Item>
                            )}
                        </Descriptions>
                      </Card>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TaskDetail;
