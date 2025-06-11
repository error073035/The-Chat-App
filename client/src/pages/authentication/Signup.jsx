import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Login() {
  const [signupData, setSignupData] = useState({
      fullname:"",
      username: "",
      password: "",
      confirmpassword: "",
    });
  
    const handleInputChange = (e) => {
      setSignupData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    console.log(signupData);
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
              name="fullname"
              onChange={handleInputChange}
            />
            <div className="label">
              <span className="label-text-alt text-xs">
              </span>
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
          <br /><br />
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
              name="confirmpassword"
              onChange={handleInputChange}
            />
            <div className="label">
              <span className="label-text-alt text-xs">
                Must be more than 8 characters
              </span>
            </div>
          </label>
          <button type="submit" className="btn btn-primary w-full mt-2">
            Signup
          </button>
          <p className="text-sm">
            Already have an account? <Link className="text-blue-400 underline" to="/Login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}
