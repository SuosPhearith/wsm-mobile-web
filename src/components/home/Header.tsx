import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SafeArea } from "antd-mobile";
import profileImage from "./../../assets/imgaes/profile2.jpg";
import { IoLogOutOutline } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(
    window.localStorage.getItem("profile") || "null"
  );

  // Redirect to login if profile doesn't exist
  useEffect(() => {
    if (!profile) {
      navigate("/login", { replace: true });
    }
  }, [profile, navigate]);

  // Handle logout
  const handleLogout = () => {
    window.localStorage.removeItem("profile");
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-primary p-4 rounded-b-3xl">
      <div style={{ background: "#ace0ff" }}>
        <SafeArea position="top" />
      </div>
      <div className="flex w-full justify-between items-center">
        <section className="flex items-center gap-1 text-white">
          <div className="w-14 h-14 bg-red-400 rounded-full">
            <img
              src={profileImage}
              alt="profile"
              className="bg-red w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <div>Welcome,</div>
            <div className="text-base">{profile?.name || "User"}</div>
          </div>
        </section>
        <div className="">
          <IoLogOutOutline
            onClick={handleLogout}
            size={25}
            className="text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
