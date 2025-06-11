import React from "react";

export default function User() {
  return (
    <>
      <div className="flex gap-3 items-center p-3">
        <div className="avatar avatar-online">
        <div className="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1">Fullname</h2>
      <h2 className="text-sm">Username</h2>
      </div>
      </div>
      
    </>
  );
}
