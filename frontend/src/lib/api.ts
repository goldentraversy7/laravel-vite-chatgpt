import { useQuery } from "@tanstack/react-query";
import customAxios from "../config/http";
import axios from "axios";

import {
  User,
  ChatRoom,
  ChatRoomInput,
  chatUsersInput,
  ChatRoomUsers,
  Message,
  MessageInputs,
  QAMessage,
  QAMessageInputs,
} from "./interfaces";
const baseURL = import.meta.env.VITE_BASE_URL;

export interface LoginResponse {
  token: string;
  token_type: string;
  expires_in: number;
}

export const logIn = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post(baseURL + "/login", {
    email,
    password,
  });
  return response.data;
};

export const signUp = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
): Promise<unknown> => {
  const response = await axios.post(baseURL + "/register", {
    name,
    email,
    password,
    password_confirmation,
  });
  if (response.status !== 200) {
    throw new Error("Invalid credentials");
  }
  return response.data;
};

export const getUser = async (): Promise<User> => {
  const response = await customAxios.get("/user");
  if (response.status !== 200) {
    throw new Error("Invalid credentials");
  }
  return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await customAxios.get("/users");
  if (response.status !== 200) {
    throw new Error("Invalid credentials");
  }
  return response.data;
};

export const useGetUserQuery = () => {
  return useQuery<User>(["user"], getUser);
};

export const logOut = async (): Promise<void> => {
  localStorage.removeItem("token");
  const response = await customAxios.post("/logout");
  console.log(response);
};

export const changeSettings = async (
  name: string,
  email: string
): Promise<User> => {
  const response = await customAxios.patch("/settings/profile", {
    name,
    email,
  });
  return response.data;
};

export const getChatRooms = async (): Promise<ChatRoom[]> => {
  const response = await customAxios.get("/chatrooms");
  return response.data;
};

export const getChatRoomUsers = async (): Promise<ChatRoomUsers> => {
  const response = await customAxios.get("/chatroom_users");
  return response.data;
};

export const deleteChatRoom = async (id: number): Promise<string> => {
  const response = await customAxios.delete(`/chatrooms/${id}`);
  return response.data;
};

export const createChatRoom = async (
  chatInput: ChatRoomInput
): Promise<ChatRoom> => {
  const response = await customAxios.post("/chatrooms", chatInput);
  return response.data;
};

export const createChatRoomUsers = async (
  chatUsersInput: chatUsersInput
): Promise<ChatRoomUsers> => {
  const response = await customAxios.post("/chatroom_users", chatUsersInput);
  return response.data;
};

export const getMessages = async (): Promise<Message[]> => {
  const response = await customAxios.get("/messages");
  return response.data;
};

export const createMessage = async (
  message: MessageInputs
): Promise<Message> => {
  const response = await customAxios.post("/messages", message);
  return response.data;
};

export const getQAMessages = async (): Promise<QAMessage[]> => {
  const response = await customAxios.get("/qas");
  return response.data;
};

export const createQAMessage = async (
  message: QAMessageInputs
): Promise<Message> => {
  const response = await customAxios.post("/qas", message);
  return response.data;
};
