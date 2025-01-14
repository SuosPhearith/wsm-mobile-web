import { FaCheckCircle, FaTasks, FaCalendarAlt, FaUser, FaFileAlt, FaShoppingCart, FaBell, FaComments } from 'react-icons/fa';

const Task = () => {
  // Sample task items with icons and names
  const taskItems = [
    { id: 1, icon: <FaCheckCircle size={24} className="text-blue-500" />, name: 'Completed' },
    { id: 2, icon: <FaTasks size={24} className="text-green-500" />, name: 'Ongoing' },
    { id: 3, icon: <FaCalendarAlt size={24} className="text-red-500" />, name: 'Scheduled' },
    { id: 4, icon: <FaUser size={24} className="text-purple-500" />, name: 'Assigned' },
    { id: 5, icon: <FaFileAlt size={24} className="text-yellow-500" />, name: 'Reports' },
    { id: 6, icon: <FaShoppingCart size={24} className="text-pink-500" />, name: 'Orders' },
    { id: 7, icon: <FaBell size={24} className="text-teal-500" />, name: 'Notifications' },
    { id: 8, icon: <FaComments size={24} className="text-indigo-500" />, name: 'Messages' },
  ];

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {taskItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center bg-white p-4 rounded-lg"
        >
          {item.icon}
          <p className="mt-2 text-sm font-medium text-gray-700">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Task;
