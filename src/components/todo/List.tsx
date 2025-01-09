import { Button, NavBar } from "antd-mobile";
import { todos } from "../../mock/data";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";

const List = () => {
  const nagivate = useNavigate();
  return (
    <div>
      <NavBar
        left={<div className="text-blue-800">Task Completed</div>}
        right={
          <Button
            size="small"
            shape="rounded"
            color="primary"
            onClick={() => nagivate("/todo/map/all")}
          >
            Maps
          </Button>
        }
        backIcon={false}
        className="bg-white"
      ></NavBar>
      <section className="mt-2 px-2">
        {todos.map((item) => (
          <div onClick={() => nagivate("/todo/" + item.id)} key={item.id}>
            <ListItem item={item} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default List;
