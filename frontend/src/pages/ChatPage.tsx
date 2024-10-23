import { useQuery } from "@tanstack/react-query";
import ChatRooms from "../components/ChatRooms";
import Dashboard from "../components/Dashboard";
import ChatWindow from "../components/ChatWindow";
import {
  getAllUsers,
  getChatRoomUsers,
  getChatRooms,
  getUser,
} from "../lib/api";
import { ChatRoom, ChatRoomUsers, User } from "../lib/interfaces";
import { useState } from "react";

const ChatPage = () => {
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<number | null>(
    null
  );
  const { data: chatrooms } = useQuery<ChatRoom[]>({
    queryKey: ["chatrooms"],
    queryFn: getChatRooms,
    refetchInterval: 6000,
  });
  const { data: chatUsers } = useQuery<ChatRoomUsers[]>({
    queryKey: ["chatroomusers"],
    queryFn: getChatRoomUsers,
  });
  const { data: user } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const { data: users } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <Dashboard>
      <div className="flex">
        <div className="w-1/3  overflow-y-auto p-2">
          {chatrooms && user && users && chatUsers && (
            <ChatRooms
              chatrooms={chatrooms}
              user={user}
              users={users}
              setSelectedChatRoomId={setSelectedChatRoomId}
            />
          )}
        </div>
        <div className="w-2/3 overflow-y-auto p-2">
          {selectedChatRoomId !== null && user && (
            <ChatWindow
              selectedChatRoomId={selectedChatRoomId}
              user={user}
              users={users}
            />
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default ChatPage;
