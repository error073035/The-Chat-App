import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <form className="bg-base-100 p-8 rounded-xl shadow-md w-full max-w-sm space-y-5">
          <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-2">
                <FaUser /> Username
              </span>
            </div>
            <input
              type="text"
              required
              placeholder="Username"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength={3}
              maxLength={30}
              title="Only letters, numbers or dash"
              className="input input-bordered w-full"
              name="username"
              onChange={handleInputChange}
            />
            <div className="label">
              <span className="label-text-alt text-xs">
                Must be 3 to 30 characters, only letters, numbers or dash
              </span>
            </div>
            <br /> <br />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-2">
                <RiLockPasswordFill /> Password
              </span>
            </div>
            <input
              type="password"
              required
              placeholder="Password"
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              className="input input-bordered w-full"
              name="password"
              onChange={handleInputChange}
            />
            <div className="label">
              <span className="label-text-alt text-xs">
                Must be more than 8 characters
              </span>
            </div>
          </label>
          <button
            onClick={handleLogin}
            type="submit"
            className="btn btn-primary w-full mt-2"
          >
            Login
          </button>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link className="text-blue-400 underline" to="/Signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
