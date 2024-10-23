import { useQuery } from "@tanstack/react-query";
import Dashboard from "../components/Dashboard";
import ChatGPTWindow from "../components/ChatGPTWindow";
import { getUser } from "../lib/api";
import { User } from "../lib/interfaces";

const ChatGPTPage = () => {
  const { data: user } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <Dashboard>
      <div className="flex">
        <div className="w-full overflow-y-auto p-2">
          {user && <ChatGPTWindow user={user} />}
        </div>
      </div>
    </Dashboard>
  );
};

export default ChatGPTPage;
