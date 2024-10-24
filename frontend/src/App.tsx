import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import RenderRouter from "./routes";
import pusher from "./lib/pusher";

interface MessageData {
  message: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  console.log("i am listening pusher => ", messages);
  useEffect(() => {
    // Subscribe to a channel and bind an event
    const channel = pusher.subscribe("admin-qa-channel");

    channel.bind("QuestionCreated", (data: MessageData) => {
      // Update the state with the new data
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      channel.unbind("QuestionCreated"); // Unbind the event before unsubscribing
      pusher.unsubscribe("admin-qa-channel");
    };
  }, []);

  return (
    <BrowserRouter>
      <RenderRouter />
    </BrowserRouter>
  );
};

export default App;
