import React from "react";
import { MessageInputProps } from "../lib/interfaces";

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  handleCreateMessage,
}) => {
  return (
    <div className="p-4 flex items-center">
      <input
        name="message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full p-2 border rounded-xl"
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreateMessage();
          }
        }}
      />
      <button
        onClick={handleCreateMessage}
        className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-xl transition-colors hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
