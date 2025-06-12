import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

export default function User({ userDetails }) {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.userReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const isUserOnline = onlineUsers?.includes(userDetails?._id);

  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  };

  return (
    <>
      <div
        onClick={handleUserClick}
        className={`flex gap-3 items-center p-3 ${
          userDetails?._id === selectedUser?._id && "bg-gray-700"
        }`}
      >
        <div className={`avatar ${isUserOnline && 'online'}`}>
          <div className="w-16 rounded-full">
             <img src={userDetails?.avatar} />
          </div>
        </div>
        <div>
          <h2 className="line-clamp-1">{userDetails?.fullName}</h2>
        <p className="text-xs">{userDetails?.username}</p>
        </div>
      </div>
    </>
  );
}
