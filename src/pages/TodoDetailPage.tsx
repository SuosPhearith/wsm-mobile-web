import { Button, Divider, NavBar } from "antd-mobile";
import { useNavigate, useParams } from "react-router-dom";
import { todos } from "../mock/data";
import { TodoInterface } from "../mock/type"; // Assuming you have a type file
import MapWithMarker from "../components/todo/MapWithMarker";

const TodoDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Check if ID is valid
  if (!id || isNaN(Number(id))) {
    return <div>Todo not found</div>;
  }

  // Find the todo item
  const todo: TodoInterface | undefined = todos.find((item) => item.id === +id);

  // Handle case where todo is not found
  if (!todo) {
    return <div>Todo not found</div>;
  }

  // Navigation to Google Maps
  const handleNavigateToMapApp = () => {
    const mapUrl = `https://www.google.com/maps?q=${todo.latitude},${todo.longitude}`;
    window.open(mapUrl, "_blank");
  };

  return (
    <div className=" h-full flex-col justify-between flex">
      <div>
        <NavBar
          className="bg-white"
          onBack={() => navigate(-1)}
          right={
            <Button
              size="small"
              shape="rounded"
              color="primary"
              onClick={handleNavigateToMapApp}
            >
              Maps
            </Button>
          }
        >
          Todo Detail
        </NavBar>
        <MapWithMarker latitude={todo.latitude} longitude={todo.longitude} />
        <div className="p-4">
          <h2 className="text-lg font-bold">{todo.name}</h2>
          <p className="text-sm text-gray-600">{todo.description}</p>
          <p className="mt-2">
            <strong>Priority:</strong> {todo.priority}
          </p>
          <p>
            <strong>Status:</strong> {todo.status}
          </p>
          <p>
            <strong>Type:</strong> {todo.type}
          </p>
          <p>
            <strong>Assigned By:</strong> {todo.assigned_by}
          </p>
          <p>
            <strong>Time Slot:</strong> {todo.time_slot}
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 w-full p-4">
        <Divider />
        <div className="w-full flex gap-4">
          <button className="bg-primary p-3 w-full rounded-xl text-lg font-bold text-white">
            Start Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;
