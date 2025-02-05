import {
  FaCheckCircle,
  FaTasks,
  FaCalendarAlt,
  FaUser,
  FaFileAlt,
  FaShoppingCart,
  FaBell,
  FaComments,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Task = () => {
  const { t } = useTranslation(); // Use "task" namespace

  // Task items with icons and translated names
  const taskItems = [
    {
      id: 1,
      icon: <FaCheckCircle size={24} className="text-blue-500" />,
      name: t("task.completed"),
    },
    {
      id: 2,
      icon: <FaTasks size={24} className="text-green-500" />,
      name: t("task.ongoing"),
    },
    {
      id: 3,
      icon: <FaCalendarAlt size={24} className="text-red-500" />,
      name: t("task.scheduled"),
    },
    {
      id: 4,
      icon: <FaUser size={24} className="text-purple-500" />,
      name: t("task.assigned"),
    },
    {
      id: 5,
      icon: <FaFileAlt size={24} className="text-yellow-500" />,
      name: t("task.reports"),
    },
    {
      id: 6,
      icon: <FaShoppingCart size={24} className="text-pink-500" />,
      name: t("task.orders"),
    },
    {
      id: 7,
      icon: <FaBell size={24} className="text-teal-500" />,
      name: t("task.notifications"),
    },
    {
      id: 8,
      icon: <FaComments size={24} className="text-indigo-500" />,
      name: t("task.messages"),
    },
  ];

  return (
    <div className="p-6 pt-0 mb-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📌 {t("task.title", "Task Dashboard")}</h2>
      <div className=" grid grid-cols-2 gap-2">
        {taskItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-white p-4 rounded-lg"
          >
            {item.icon}
            <p className="mt-2 text-sm font-medium text-gray-700">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
