import React, { useState } from "react";
import { notification, Input, Space } from "antd";
import useTaskStore, { Task } from "../store/taskStore";
import NewTaskModal from "./NewTaskModal";
import CustomList from "./CustomList";
import styles from "./index.module.css";
import DeleteTaskModal from "./DeleteTaskModal";

type NotificationType = "success" | "info" | "warning" | "error";

const TaskList: React.FC = () => {
  const { tasks, addTask, deleteTask, searchTasks } = useTaskStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [isDelteModalVisible, setIsDelteModalVisible] =
    useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message,
      description,
    });
  };
  const handleAddTask = (name: string) => {
    if (name.trim()) {
      addTask(name, openNotificationWithIcon);
      setIsModalVisible(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showDeleteModal = (id: number) => {
    setIsDelteModalVisible(true);
    setDeleteId(id);
  };

  const handleDeleteCancel = () => {
    setIsDelteModalVisible(false);
  };

  const handleDeleteTask = (id: number) => {
    deleteTask(id, openNotificationWithIcon);
    setIsDelteModalVisible(false);
  };

  const filteredTasks: Task[] = searchTasks(searchQuery);

  return (
    <div style={{ padding: "20px" }}>
      {contextHolder}
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <NewTaskModal
          visible={isModalVisible}
          onCreate={handleAddTask}
          onCancel={handleCancel}
        />
        <DeleteTaskModal
          visible={isDelteModalVisible}
          onOk={handleDeleteTask}
          onCancel={handleDeleteCancel}
          deleteId={deleteId}
        />
        <CustomList
          dataSource={filteredTasks}
          renderItem={(task: Task) => (
            <div className={styles.customListItem}>
              <div className={styles.customListItemName}>{task.name}</div>
              <div
                className={styles.deleteTaskButton}
                onClick={() => {
                  showDeleteModal(task.id);
                }}
              >
                Delete
              </div>
            </div>
          )}
        />
        <div className={styles.addTaskButtonWrapper}>
          <button onClick={showModal} className={styles.addTaskButton}>
            New Task
          </button>
        </div>
      </Space>
    </div>
  );
};

export default TaskList;
