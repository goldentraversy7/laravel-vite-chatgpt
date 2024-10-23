import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import QAMessages from "./QAMessages";
import {
  ChatGPTWindowProps,
  QAMessage,
  QAMessageInputs,
} from "../lib/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createQAMessage, getQAMessages } from "../lib/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// declare global {
//   interface Window {
//     Pusher: typeof Pusher;
//   }
// }
const ChatWindow: React.FC<ChatGPTWindowProps> = ({ user }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: messages } = useQuery<QAMessage[]>({
    queryKey: ["qamessages"],
    queryFn: getQAMessages,
    // refetchInterval: 6000,
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
    (args: QAMessageInputs) => {
      return createQAMessage(args);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["qamessages"]);
      },
    }
  );

  const handleCreateMessage = async () => {
    await messageMutation.mutateAsync({
      message: newMessage,
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

  const filteredMessages = messages?.filter((msg) => msg.user_id === user.id);

  return (
    <div className="flex flex-col border p-2 rounded-xl border-blue-500 h-96">
      {filteredMessages && (
        <QAMessages
          chatContainerRef={chatContainerRef}
          qamessages={filteredMessages}
          user={user}
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
