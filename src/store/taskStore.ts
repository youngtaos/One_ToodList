import { useState, useEffect } from "react";

export interface Task {
  id: number;
  name: string;
}

export type NotificationType = "success" | "info" | "warning" | "error";

const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Analog interface
    setTimeout(() => {
      setTasks([
        { id: 1, name: "Task 1" },
        { id: 2, name: "Task 2" },
        { id: 3, name: "Task 3" },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const addTask = (
    name: string,
    callback: (
      str: NotificationType,
      message: string,
      description: string,
    ) => void,
  ) => {
    setTimeout(() => {
      //can not have same name in tasks
      if (tasks.find((item) => item.name === name)) {
        callback("error", "Task already exsit", "Task already exsit");
        return;
      }
      setTasks([{ id: Date.now(), name }, ...tasks]);
      callback(
        "success",
        "The new task was successfully created ",
        "The new task was successfully created",
      );
    }, 1000);
  };

  const deleteTask = (
    id: number,
    callback: (
      str: NotificationType,
      message: string,
      description: string,
    ) => void,
  ) => {
    setTimeout(() => {
      setTasks(tasks.filter((task) => task.id !== id));
      callback(
        "success",
        "The task was successfully deleted",
        "The task was successfully deleted",
      );
    }, 1000);
  };

  const searchTasks = (query: string) => {
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return {
    tasks,
    loading,
    addTask,
    deleteTask,
    searchTasks,
  };
};

export default useTaskStore;
