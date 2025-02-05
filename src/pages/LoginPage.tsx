import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import oflImage from "../assets/imgaes/ofl.svg";
import { FaLock, FaUser } from "react-icons/fa";
import { useMutation } from "react-query";
import { loginReq, meReq } from "../api/auth";

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { mutate: MLogin, isLoading: lLogin } = useMutation({
    mutationFn: loginReq,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      setError(err.response?.data?.message || "Invalid Credential!");
      console.log(err);
    },
    onSuccess: async (res) => {
      window.localStorage.setItem("token", res);
      const me = await meReq();
      window.localStorage.setItem("profile", JSON.stringify(me));
      navigate("/seleted-app", { replace: true });
    },
  });

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      MLogin({ email: username, password });
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between gap-5">
      <div className="p-4 bg-white h-1/3 flex flex-col justify-center items-center rounded-b-[20px] border-b-2 border-primary">
        <img
          src={oflImage}
          alt="logo"
          className="w-full p-5 h-1/2 rounded-lg"
        />
      </div>

      <div className="p-8 rounded-t-2xl bg-white shadow border-t-2 border-primary w-full h-2/3">
        <h2 className="text-gray-800 text-center text-2xl font-bold">
          Sign in to your account
        </h2>
        <form onSubmit={login} className="mt-8 space-y-4">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Username</label>
            <div className="relative flex items-center">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-2xl outline-blue-600"
                placeholder="Enter user name"
              />
              <FaUser className="w-4 h-4 absolute right-4 cursor-pointer text-slate-300" />
            </div>
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <div className="relative flex items-center">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-2xl outline-blue-600"
                placeholder="Enter password"
              />
              <FaLock className="w-4 h-4 absolute right-4 cursor-pointer text-slate-300" />
            </div>
          </div>

          <div className="pb-10">
            <button
              type="submit"
              className="flex w-full justify-center rounded-2xl bg-blue-500 px-3 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-indigo-600"
            >
              {lLogin ? "..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
