import React, { useState } from "react";
import { Modal, Form, Input } from "antd";

interface DeleteTaskModalProps {
  visible: boolean;
  onOk: (id: number) => void;
  onCancel: () => void;
  deleteId: number;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  visible,
  deleteId,
  onOk,
  onCancel,
}) => {
  const handleOk = () => {
    onOk(deleteId);
  };

  return (
    <Modal
      title="Are you sure you want to delete this task?"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Ok"
      cancelText="Cancle"
    ></Modal>
  );
};

export default DeleteTaskModal;
