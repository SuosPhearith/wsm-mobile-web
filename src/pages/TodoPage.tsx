import { SafeArea } from "antd-mobile";
import List from "../components/todo/List";

const TodoPage = () => {
  return (
    <div>
      <div style={{ background: "#ace0ff" }}>
        <SafeArea position="top" />
      </div>
      <List />
    </div>
  );
};

export default TodoPage;
