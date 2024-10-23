import { TrashIcon } from "@heroicons/react/20/solid";
import React from "react";
import { ChatCardProps } from "../lib/interfaces";

const ChatCard: React.FC<ChatCardProps> = ({
  userChatRooms,
  handleDelete,
  handleChatRoomSelection,
}) => {
  return (
    <div className="h-full overflow-y-auto flex flex-col gap-1">
      {userChatRooms.map((chat) => (
        <div
          key={chat.id}
          className="flex justify-between items-center border-b py-2 cursor-pointer hover:bg-blue-700 rounded-xl border border-blue-600 p-2"
          onClick={() => handleChatRoomSelection(chat.id)}
        >
          <div className="flex flex-col">
            <span className="text-white font-semibold">{chat.name}</span>
            <span className="text-sm text-white">
              Created: {new Date(chat.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="">
            <button
              className="p-2 focus:outline-none hover:bg-red-600 rounded-xl"
              onClick={() => handleDelete(chat.id)}
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" color="red" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatCard;
