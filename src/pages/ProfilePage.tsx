import { FC, ReactNode, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { MdEdit, MdLockOutline, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import profileImage from "../assets/imgaes/profile.jpg";

const ProfilePage = () => {
  const { t } = useTranslation(); // Use "profile" namespace
  const navigate = useNavigate();
  const [profile] = useState(JSON.parse(window.localStorage.getItem("profile") || "{}"));

  // Handle logout
  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  // If no profile is found
  if (!profile) return <div>{t("profile.noProfile")}</div>;

  return (
    <>
      {/* Profile Header */}
      <div className="p-4 bg-primary h-[300px] flex flex-col justify-center items-center rounded-b-[20px]">
        <div className="w-24 h-24 rounded-full flex justify-center items-center bg-slate-100">
          <img
            src={profile?.photo || profileImage}
            className="w-full h-full object-cover rounded-full"
            alt={t("profile.profileImageAlt")}
          />
        </div>
        <div className="text-lg mt-2 font-bold text-white">
          {profile?.name || t("profile.guest")}
        </div>
        <div className="text-base mt-2 text-white">
          {profile?.role?.name || t("profile.user")} {t("profile.at")}{" "}
          {profile?.wholesale?.business_name || t("profile.unknownBusiness")}
        </div>
      </div>

      {/* Profile Actions */}
      <div className="p-4 flex flex-col w-full">
        <ProfileActionItem
          icon={<MdEdit size={24} />}
          text={t("profile.editProfile")}
          // onClick={() => navigate("/edit-profile")}
        />
        <ProfileActionItem
          icon={<LuClipboardList size={24} />}
          text={t("profile.saleOrder")}
          // onClick={() => navigate("/sale-order")}
        />
        <ProfileActionItem
          icon={<LuClipboardList size={24} />}
          text={t("profile.saleInvoice")}
          onClick={() => navigate("/sale-invoice-history")}
        />
        <ProfileActionItem
          icon={<MdLockOutline size={24} />}
          text={t("profile.changePassword")}
          // onClick={() => navigate("/change-password")}
        />
        <ProfileActionItem
          icon={<MdLogout size={24} />}
          text={t("profile.logout")}
          onClick={handleLogout}
        />
      </div>
    </>
  );
};

type ProfileActionItemProps = {
  icon: ReactNode; // For rendering icons
  text: string; // Text to display
  onClick?: () => void; // Click event handler
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
