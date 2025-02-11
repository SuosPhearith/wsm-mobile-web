import { TabBar } from "antd-mobile";
import {
  AddCircleOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import { useTranslation } from "react-i18next";
import { AiOutlineHome } from "react-icons/ai";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const { t } = useTranslation();

  const tabs = [
    { key: "/", title: t("layout.home"), icon: <AiOutlineHome /> },
    { key: "/todo", title: t("layout.todo"), icon: <UnorderedListOutline /> },
    { key: "/sale", title: t("layout.sale"), icon: <AddCircleOutline /> },
    { key: "/profile", title: t("layout.profile"), icon: <UserOutline /> },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value, { replace: true });
  };

  return (
    <div className="flex flex-col h-screen bg-primary">
      {/* Main Content Section with PullToRefresh */}
      <main className="flex-grow bg-gray-100 safe-area-inset-bottom">
        {/* <PullToRefresh
          pullingText={<div>{t("layout.refreshing")}</div>}
          canReleaseText={<div>{t("layout.refreshing")}</div>}
          refreshingText={<div>{t("layout.refreshing")}</div>}
          completeText={<div>{t("layout.refreshing")}</div>}
          onRefresh={async () => {
            window.location.reload();
          }}
        >
          <Outlet />
        </PullToRefresh> */}
        <Outlet />
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
