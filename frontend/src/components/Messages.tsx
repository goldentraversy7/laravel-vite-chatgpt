import React from "react";
import { MessagesProps } from "../lib/interfaces";

const Messages: React.FC<MessagesProps> = ({
  chatContainerRef,
  messages,
  user,
  users,
}) => {
  const showName = (id: number) => {
    if (users) {
      const user = users.find((user) => user.id === id);
      return user?.name;
    }
  };
  return (
    <div className="overflow-y-auto p-4 h-80" ref={chatContainerRef}>
      {messages.map((msg) => (
        <div
          className="flex text-center justify-center items-center"
          key={msg.id}
        >
          <div
            key={msg.id}
            className={`
              ${
                msg.user_id === user.id
                  ? "flex flex-row mr-4 ml-auto w-fit"
                  : msg.user_id !== user.id
                  ? "flex mr-auto ml-4 w-fit"
                  : "self-start"
              }
              p-3 mb-2 rounded-lg shadow
              ${msg.user_id === user.id ? "bg-green-200" : "bg-white"}
            `}
          >
            <div className="h-8 w-8 rounded-full bg-gray-200 flex flex-start items-center justify-center text-lg">
              {showName(msg.user_id)?.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex justify-center text-center items-center ml-4">
              <span className="break-all">{msg.message}</span>
            </div>
            <div className="flex text-center justify-center items-center text-sm text-gray-500 ml-4">
              {new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
