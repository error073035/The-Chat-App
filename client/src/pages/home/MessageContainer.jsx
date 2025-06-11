import React from "react";
import User from "./User";
import Message from "./Message";

export default function MessageContainer() {
  return (
    <>
      <div className="h-screen w-full flex flex-col">
        <div className="p-2 border-b border-b-white/10 shrink-0">
          <User />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <form className="w-full p-2 bg-base-100 border-t border-t-white/10 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Type your message…"
            className="input input-primary input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
