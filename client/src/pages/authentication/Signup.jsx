import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "", // <-- fix here
    gender: "male",
  });
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // console.log(signupData);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Password and confirm password do not match");
    }
    const response = await dispatch(registerUserThunk(signupData));
    if (response?.payload?.success) {
      toast.success("Signup successful! Please login.");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <form className="bg-base-100 p-8 rounded-xl shadow-md w-full max-w-sm space-y-5">
          <h2 className="text-2xl font-bold text-center mb-2">Signup</h2>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-2">
                <FaUser /> Fullname
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
              name="fullName"
              onChange={handleInputChange}
            />
            <div className="label">
              <span className="label-text-alt text-xs"></span>
            </div>
            <br /> <br />
          </label>
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
          <br />
          <br />
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-2">
                <RiLockPasswordFill /> Confirm Password
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
              name="confirmPassword"
              onChange={handleInputChange}
            />
            <div className="label">
              <span className="label-text-alt text-xs">
                Must be more than 8 characters
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-2">Gender</span>
            </div>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={signupData.gender === "male"}
                  onChange={handleInputChange}
                  className="radio radio-primary"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={signupData.gender === "female"}
                  onChange={handleInputChange}
                  className="radio radio-primary"
                />
                <span>Female</span>
              </label>
            </div>
          </label>
          <button
            onClick={handleSignup}
            type="submit"
            className="btn btn-primary w-full mt-2"
          >
            Signup
          </button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="text-blue-400 underline" to="/Login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
