import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { todos } from "../mock/data"; // Example data
import { Button, NavBar, Popup } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TodoInterface } from "../mock/type";

const mapContainerStyle = {
  width: "100%",
  height: "80vh",
};

const center = { lat: 11.562108, lng: 104.888535 }; // Default center (Phnom Penh)

const TodoMapPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [todo, setTodo] = useState<TodoInterface>();
  // Load the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleOpen = (todo: TodoInterface) => {
    setTodo(todo);
    setVisible(true);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <NavBar
        onBack={() => navigate(-1)}
        right={
          <Button
            size="small"
            shape="rounded"
            color="primary"
            // onClick={() => nagivate("/todo/map/all")}
          >
            Maps
          </Button>
        }
        className="bg-white"
      ></NavBar>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        options={{
          gestureHandling: "greedy",
        }}
        zoom={12}
      >
        {/* Render Multiple Markers */}
        {todos.map((todo) => (
          <MarkerF
            key={todo.id}
            position={{ lat: todo.latitude, lng: todo.longitude }}
            title={todo.name}
            onClick={() => handleOpen(todo)}
          />
        ))}
      </GoogleMap>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh",
        }}
      >
        {todo && (
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
            <p className="mb-2">
              <strong>Time Slot:</strong> {todo.time_slot}
            </p>
            <Button size="small" color="primary">Go To Maps</Button>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default TodoMapPage;
