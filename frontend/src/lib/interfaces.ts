export interface DashboardProps {
  children: React.ReactNode;
}

export interface NavbarProps {
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoom {
  id: number;
  name: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ChatRoomUsers {
  id: number;
  chat_room_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface ChatRoomInput {
  name: string;
  created_by: string;
}

export interface ChatRoom {
  id: number;
  name: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface chatUsersInput {
  chat_room_id: number;
  user_id: number[];
}

export interface ChatRoomUsers {
  id: number;
  chat_room_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface ChatCardProps {
  userChatRooms: ChatRoom[];
  handleDelete: (id: number) => void;
  handleChatRoomSelection: (id: number) => void;
}

export interface ChatRoomDialogProps {
  showDialog: boolean;
  showUserSelection: boolean;
  users: User[];
  selectedUsers: number[] | Number[];
  newChatName: string;
  setNewChatName: React.Dispatch<React.SetStateAction<string>>;
  handleCloseDialog: () => void;
  handleCreateChatRoom: () => void;
  user: User;
  setSelectedUsers: React.Dispatch<React.SetStateAction<number[] | Number[]>>;
  setShowUserSelection: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MessageInputs {
  chat_room_id: number;
  user_id: number;
  message: string;
}

export interface Message {
  id: number;
  chat_room_id: number;
  user_id: number;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface MessageInputProps {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  handleCreateMessage: () => void;
}

export interface ChatroomProps {
  chatrooms: ChatRoom[];
  user: User;
  users: User[];
  setSelectedChatRoomId?: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface ChatWindowProps {
  selectedChatRoomId: number;
  user: User;
  users?: User[];
}

export interface MessagesProps {
  chatContainerRef: React.RefObject<HTMLDivElement>;
  messages: Message[];
  user: User;
  users?: User[];
}

export interface QAMessageInputs {
  user_id: number;
  message: string;
}

export interface QAMessage {
  id: number;
  user_id: number;
  msg: string;
  msg_time: string;
  flag: number;
}

export interface QAMessagesProps {
  chatContainerRef: React.RefObject<HTMLDivElement>;
  qamessages: QAMessage[];
  user: User;
}

export interface ChatGPTWindowProps {
  user: User;
}
