import React from "react";
import { QAMessagesProps } from "../lib/interfaces";

const QAMessages: React.FC<QAMessagesProps> = ({
  chatContainerRef,
  qamessages,
  user,
}) => {
  return (
    <div className="overflow-y-auto p-4 h-80" ref={chatContainerRef}>
      {qamessages.map((msg) => (
        <div
          className="flex text-center justify-center items-center"
          key={msg.id}
        >
          <div
            key={msg.id}
            className={`
              ${
                msg.flag === 1
                  ? "flex flex-row mr-4 ml-auto w-fit"
                  : msg.flag !== 1
                  ? "flex mr-auto ml-4 w-fit"
                  : "self-start"
              }
              p-3 mb-2 rounded-lg shadow
              ${msg.flag === 1 ? "bg-green-200" : "bg-white"}
            `}
          >
            <div className="h-8 w-8 rounded-full bg-gray-200 flex flex-start items-center justify-center text-lg">
              {msg.flag === 0 ? user.name?.substring(0, 2).toUpperCase() : ""}
            </div>
            <div className="flex justify-center text-center items-center ml-4">
              <span className="break-all">{msg.msg}</span>
            </div>
            <div className="flex text-center justify-center items-center text-sm text-gray-500 ml-4">
              {new Date(msg.msg_time).toLocaleTimeString([], {
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

export default QAMessages;
