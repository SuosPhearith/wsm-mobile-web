import { TabBar, PullToRefresh } from "antd-mobile";
import {
  AddCircleOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import { AiOutlineHome } from "react-icons/ai";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const tabs = [
    { key: "/", title: "Home", icon: <AiOutlineHome /> },
    { key: "/todo", title: "Todo", icon: <UnorderedListOutline /> },
    { key: "/sale", title: "Sale", icon: <AddCircleOutline /> },
    { key: "/profile", title: "Profile", icon: <UserOutline /> },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value, { replace: true });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content Section with PullToRefresh */}
      <main className="flex-grow bg-gray-100">
        <PullToRefresh
          pullingText={<div>Refreshing...</div>}
          canReleaseText={<div>Refreshing...</div>}
          refreshingText={<div>Refreshing...</div>}
          completeText={<div>Refreshing...</div>}
          onRefresh={async () => {
            window.location.reload();
          }}
        >
          <Outlet />
        </PullToRefresh>
      </main>

      {/* TabBar Section */}
      <TabBar
        activeKey={pathname}
        onChange={(value) => setRouteActive(value)}
        safeArea
        className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200"
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default MainLayout;
