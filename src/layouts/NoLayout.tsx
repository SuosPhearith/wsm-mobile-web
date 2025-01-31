import { Outlet } from "react-router-dom";

const NoLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-primary">
      {/* Main Content Section */}
      <main className="flex-grow bg-gray-100 safe-area-inset-bottom">
        <Outlet />
      </main>
    </div>
  );
};

export default NoLayout;
