import React from "react";
import { Layout, Typography } from "antd";
import TaskList from "./components/TaskList";

const App: React.FC = () => (
  <Layout>
    <TaskList />
  </Layout>
);

export default App;
