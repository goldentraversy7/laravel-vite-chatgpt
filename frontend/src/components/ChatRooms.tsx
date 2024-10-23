import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChatRoomInput,
  chatUsersInput,
  ChatroomProps,
} from "../lib/interfaces";
import { useState } from "react";
import {
  createChatRoom,
  createChatRoomUsers,
  deleteChatRoom,
} from "../lib/api";
import { notification } from "antd";
import ChatCard from "./ChatCard";
import ChatRoomDialog from "./ChatRoomDialog";

const ChatRooms: React.FC<ChatroomProps> = ({
  chatrooms,
  user,
  users,
  setSelectedChatRoomId,
}) => {
  const queryClient = useQueryClient();
  const [newChatName, setNewChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Number[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showUserSelection, setShowUserSelection] = useState(false);

  const deleteChatRoomMutate = useMutation(
    (args: number) => {
      return deleteChatRoom(args);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["chatrooms"]);
      },
    }
  );

  const handleDelete = async (id: number) => {
    if (
      user.name !== chatrooms.find((chatroom) => chatroom.id === id)?.created_by
    ) {
      return notification.error({
        message: "Chat room not created by you",
        description: "You can only delete chat rooms created by you",
      });
    }

    if (window.confirm("Are you sure?")) {
      await deleteChatRoomMutate.mutateAsync(id);
      notification.success({
        message: "Chat room deleted",
        description: "Chat room has been deleted successfully",
      });
      queryClient.invalidateQueries(["chatroomusers"]);
      setSelectedChatRoomId && setSelectedChatRoomId(null);
    }
  };

  const chatRoomMutation = useMutation(
    (args: ChatRoomInput) => {
      return createChatRoom(args);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["chatrooms"]);
      },
    }
  );

  const chatUsersMutation = useMutation(
    (args: chatUsersInput) => {
      return createChatRoomUsers(args);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["chatroomusers"]);
      },
    }
  );

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleCreateChatRoom = async () => {
    if (!showUserSelection) {
      if (!newChatName)
        return notification.error({
          message: "Chat room name required",
          description: "Please enter a chat room name",
        });
      await chatRoomMutation.mutateAsync({
        name: newChatName,
        created_by: user.name,
      });
      setNewChatName("");

      setShowUserSelection(true);
    } else {
      const selectedUserIds = selectedUsers.map(Number);
      selectedUserIds.push(user.id);
      await chatUsersMutation.mutateAsync({
        chat_room_id: chatrooms[chatrooms.length - 1].id,
        user_id: selectedUserIds,
      });

      handleCloseDialog();
      setShowUserSelection(false);
      queryClient.invalidateQueries(["chatrooms"]);
      queryClient.invalidateQueries(["chatroomusers"]);

      notification.success({
        message: "Chat room created",
        description: "Chat room has been created and users added successfully",
      });
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setShowUserSelection(false);
  };

  const handleChatRoomSelection = (chatRoomId: number) => {
    setSelectedChatRoomId && setSelectedChatRoomId(chatRoomId);
  };

  return (
    <div className="w-full  overflow-y-auto h-96 scroll-auto border p-2 rounded-xl border-blue-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-white font-bold">My Chats</h2>
        <button
          className="px-2 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div>
        {chatrooms.length > 0 ? (
          <ChatCard
            userChatRooms={chatrooms}
            handleDelete={handleDelete}
            handleChatRoomSelection={handleChatRoomSelection}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-md text-white">
              No chat rooms available. Please create a new one.
            </p>
          </div>
        )}
      </div>
      <ChatRoomDialog
        showDialog={showDialog}
        showUserSelection={showUserSelection}
        users={users}
        selectedUsers={selectedUsers}
        newChatName={newChatName}
        setNewChatName={setNewChatName}
        handleCloseDialog={handleCloseDialog}
        handleCreateChatRoom={handleCreateChatRoom}
        user={user}
        setSelectedUsers={setSelectedUsers}
        setShowUserSelection={setShowUserSelection}
      />
    </div>
  );
};

export default ChatRooms;
