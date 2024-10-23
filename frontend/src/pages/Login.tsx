import * as React from "react";
import { useState } from "react";
import { logIn } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

type LoginFormProps = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      notification.error({
        message: "Error",
        description: "Please fill in all the fields",
      });
      return;
    }
    try {
      const response = await logIn(form.email, form.password);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Invalid credentials",
      });
    }
  };

  return (
    <div className="relative flex flex-col bg-gradient-to-r from-blue-600 to-purple-400 justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-white uppercase">
          Sign in to your account
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm  font-semibold text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-gradient-to-r from-white to-gray-400 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-gradient-to-r from-white to-gray-400 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <a href="#" className="text-xs text-purple-200 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-white">
          {" "}
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-blue-700 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
