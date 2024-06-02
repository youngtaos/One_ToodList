import React, { useState } from "react";
import { Modal, Form, Input } from "antd";

interface NewTaskModalProps {
  visible: boolean;
  onCreate: (name: string) => void;
  onCancel: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [form] = Form.useForm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  };

  const handleOk = () => {
    onCreate(newTaskName);
    setNewTaskName("");
    form.resetFields();
  };

  return (
    <Modal
      title="New Task"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okButtonProps={{ disabled: !newTaskName.trim() }}
      okText="Submit"
      cancelText="Cancle"
    >
      <Form form={form}>
        <Form.Item
          label="Task Name"
          name="taskName"
          rules={[{ required: true, message: "Please input the task name!" }]}
        >
          <Input value={newTaskName} onChange={handleInputChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewTaskModal;
