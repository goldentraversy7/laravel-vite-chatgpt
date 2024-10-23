import React from "react";
import { ChatRoomDialogProps } from "../lib/interfaces";

const ChatRoomDialog: React.FC<ChatRoomDialogProps> = ({
  showDialog,
  showUserSelection,
  users,
  newChatName,
  setNewChatName,
  handleCloseDialog,
  handleCreateChatRoom,
  user,
  setSelectedUsers,
  setShowUserSelection,
}) => {
  return (
    <div>
      {showDialog && !showUserSelection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Create New Chat</h2>
            <input
              type="text"
              name="chatroom_name"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              placeholder="Chat room name"
              className="border rounded-md p-2 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCreateChatRoom}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 mr-2"
              >
                Next
              </button>
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showDialog && showUserSelection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Select Users</h2>
            <div className="relative mb-2">
              <select
                name="users"
                multiple
                className="border rounded-md p-2 w-full appearance-none focus:outline-none focus:ring focus:border-blue-500"
                size={users.length}
                onChange={(e) => {
                  const selectedUserIds = Array.from(
                    e.target.selectedOptions,
                    (option) => Number(option.value)
                  );
                  setSelectedUsers(selectedUserIds);
                }}
                style={{
                  height: "auto",
                  width: "350px",
                  overflowY: "auto",
                  maxHeight: "350px",
                }}
              >
                {users
                  .filter((u) => u.id !== user.id)
                  .map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCreateChatRoom}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 mr-2"
              >
                Create
              </button>
              <button
                onClick={() => setShowUserSelection(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoomDialog;
