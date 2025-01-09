import { Outlet } from "react-router-dom";

const NoLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Main Content Section */}
      <main className="flex-grow bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default NoLayout;
