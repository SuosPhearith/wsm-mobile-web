import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const profile = window.localStorage.getItem("profile");

    if (!token || !profile) {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}

export default AuthCheck;
