import React from "react";
import { FaSearch } from "react-icons/fa";
import User from "./User";

export default function UserSlidebar() {
  return (
    <>
      <div className="max-w-[20em] w-full h-screen flex flex-col border-r border-gray-700 bg-base-100">
        <div>
          <h1 className="text-center mt-2 text-xl">Chat App</h1>
        </div>
        <div className="p-3">
          <label className="input input-primary input-bordered flex items-center gap-2">
            <FaSearch />
            <input
              className="grow bordered-sm"
              type="search"
              required
              placeholder="Search"
            />
          </label>
        </div>
        <div className="h-full overflow-auto">
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
        </div>
        <div className="flex items-center justify-between border-t border-gray-700">
          <div className="avatar p-3">
            <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring-2 ring-offset-2">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
          <button className="btn btn-primary m-6">Logout</button>
        </div>
      </div>
    </>
  );
}
