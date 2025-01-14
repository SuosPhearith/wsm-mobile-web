import { FC, ReactNode, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { MdEdit, MdLockOutline, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile] = useState(JSON.parse(window.sessionStorage.getItem("profile") || "{}"))

  // Handle logout
  const handleLogout = () => {
    alert('called me')
    window.localStorage.clear();
    window.sessionStorage.clear();
    navigate("/login");
  };

  // If no profile is found
  if (!profile) return <div>No profile found</div>;

  return (
    <>
      {/* Profile Header */}
      <div className="p-4 bg-primary h-[300px] flex flex-col justify-center items-center rounded-b-[20px]">
        <div className="w-24 h-24 rounded-full flex justify-center items-center bg-slate-100">
          <img
            src={profile?.photo || "https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg"}
            className="w-full h-full object-cover rounded-full"
            alt="Profile"
          />
        </div>
        <div className="text-lg mt-2 font-bold text-white">
          {profile?.name || "Guest"}
        </div>
        <div className="text-base mt-2 text-white">
          {profile?.role?.name || "User"} at {profile?.wholesale?.business_name || "Unknown Business"}
        </div>
      </div>

      {/* Profile Actions */}
      <div className="p-4 flex flex-col w-full">
        <ProfileActionItem
          icon={<MdEdit size={24} />}
          text="Edit Profile"
          // onClick={() => navigate("/edit-profile")}
        />
        <ProfileActionItem
          icon={<LuClipboardList size={24} />}
          text="Sale Order"
          // onClick={() => navigate("/sale-order")}
        />
        <ProfileActionItem
          icon={<LuClipboardList size={24} />}
          text="Sale Invoice"
          // onClick={() => navigate("/sale-invoice")}
        />
        <ProfileActionItem
          icon={<MdLockOutline size={24} />}
          text="Change Password"
          // onClick={() => navigate("/change-password")}
        />
        <ProfileActionItem
          icon={<MdLogout size={24} />}
          text="Logout"
          onClick={handleLogout}
        />
      </div>
    </>
  );
};

type ProfileActionItemProps = {
  icon: ReactNode;  // For rendering icons
  text: string;     // Text to display
  onClick?: () => void;  // Click event handler
};

const ProfileActionItem: FC<ProfileActionItemProps> = ({ icon, text, onClick }) => (
  <div
    className="flex bg-white p-2 rounded-lg justify-between items-center mt-2 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center">
      {icon}
      <div className="text-lg ms-2">{text}</div>
    </div>
    <FaArrowRightLong size={20} className="text-slate-400" />
  </div>
);

export default ProfilePage;
