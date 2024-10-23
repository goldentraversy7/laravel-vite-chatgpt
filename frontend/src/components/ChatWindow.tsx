import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { ChatWindowProps, Message, MessageInputs } from "../lib/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMessage, getMessages } from "../lib/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// declare global {
//   interface Window {
//     Pusher: typeof Pusher;
//   }
// }
const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedChatRoomId,
  user,
  users,
}) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: messages } = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: getMessages,
    refetchInterval: 6000,
  });

  // useEffect(() => {
  //   window.Pusher = Pusher;

  //   const echo = new Echo({
  //     broadcaster: "pusher",
  //     key: import.meta.env.VITE_PUSHER_APP_KEY,
  //     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  //     wsHost: window.location.hostname,
  //     wsPort: 6001,
  //     forceTLS: false,
  //     disableStats: true,
  //   });

  //   echo
  //     .channel(`chat-room.${selectedChatRoomId}`)
  //     .listen("MessageCreated", (e: any) => {
  //       queryClient.invalidateQueries(["messages"]);
  //     });

  //   return () => {
  //     echo.leave(`chat-room.${selectedChatRoomId}`);
  //   };
  // }, [selectedChatRoomId]);

  const messageMutation = useMutation(
    (args: MessageInputs) => {
      return createMessage(args);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["messages"]);
      },
    }
  );

  const handleCreateMessage = async () => {
    await messageMutation.mutateAsync({
      message: newMessage,
      chat_room_id: selectedChatRoomId,
      user_id: user.id,
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const filteredMessages = messages?.filter(
    (msg) => msg.chat_room_id === selectedChatRoomId
  );

  return (
    <div className="flex flex-col border p-2 rounded-xl border-blue-500 h-96">
      {filteredMessages && (
        <Messages
          chatContainerRef={chatContainerRef}
          messages={filteredMessages}
          user={user}
          users={users}
        />
      )}
      <div>
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleCreateMessage={handleCreateMessage}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
