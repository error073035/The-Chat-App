import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  logoutUserThunk,
} from "../../store/slice/user/user.thunk";

export default function UserSlidebar() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter((user) => {
          return (
            user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.fullName
              .toLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          );
        })
      );
    }
  }, [searchValue, otherUsers]);

  useEffect(() => {
    (async () => {
      await dispatch(getOtherUsersThunk());
    })();
  }, []);

  return (
    <div className="max-w-[20em] w-full h-screen flex flex-col border-r border-gray-700 bg-base-100">
      <div>
        <h1 className="text-center mt-4 text-2xl font-bold tracking-wide">
          Chat App
        </h1>
      </div>
      <div className="p-4">
        <label className="input input-primary input-bordered flex items-center gap-2">
          <FaSearch />
          <input
            className="grow"
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            required
            placeholder="Search users..."
          />
        </label>
      </div>
      <div className="flex-1 overflow-auto px-2">
        {users && users.length > 0 ? (
          users.map((userDetails) => (
            <User key={userDetails?._id} userDetails={userDetails} />
          ))
        ) : (
          <div className="text-center text-gray-400 mt-8">No users found.</div>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-gray-700 px-4 py-3 bg-base-200">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={userProfile?.avatar} alt="avatar" />
            </div>
          </div>
          <div>
            <h2 className="font-semibold">{userProfile?.username}</h2>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-sm btn-primary"
          title="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
