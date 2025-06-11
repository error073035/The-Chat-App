import React from "react";
import UserSlidebar from "./UserSlidebar";
import MessageContainer from "./MessageContainer";

export default function Home() {
  return (
    <>
      <div className="flex">
        <UserSlidebar />
        <MessageContainer />
      </div>
    </>
  );
}
