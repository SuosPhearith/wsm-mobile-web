import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SafeArea } from "antd-mobile";
import profileImage from "./../../assets/imgaes/profile2.jpg";
import khImage from '../../assets/imgaes/kh_flag.png';
import enImage from '../../assets/imgaes/en_flag.png';
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

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

  // Toggle language between Khmer (kh) and English (en)
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "kh" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="bg-primary p-4 rounded-b-3xl">
      <div style={{ background: "#ace0ff" }}>
        <SafeArea position="top" />
      </div>
      <div className="flex w-full justify-between items-center">
        {/* Profile Section */}
        <section className="flex items-center gap-1 text-white">
          <div className="w-14 h-14 bg-red-400 rounded-full">
            <img
              src={profileImage}
              alt="profile"
              className="bg-red w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <div>{t("welcome")},</div>
            <div className="text-base">{profile?.name || "User"}</div>
          </div>
        </section>

        {/* Language Toggle Button */}
        <div>
          <button
            onClick={toggleLanguage}
            className="flex items-center"
          >
            <img
              src={i18n.language === "en" ? khImage : enImage}
              alt="language-toggle"
              className="w-8"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
