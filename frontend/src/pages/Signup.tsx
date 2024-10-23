import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

type SignupFormProps = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignupFormProps>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(form).some((value) => !value)) {
      notification.error({
        message: "Error",
        description: "Please fill in all the fields",
      });
      return;
    }
    if (form.password !== form.password_confirmation) {
      notification.error({
        message: "Error",
        description: "Passwords do not match",
      });
      return;
    }
    try {
      signUp(form.name, form.email, form.password, form.password_confirmation);
      navigate("/login");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Invalid credentials",
      });
    }
  };

  return (
    <div className="relative flex flex-col justify-center bg-gradient-to-r from-blue-600 to-purple-400 min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto rounded-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-white uppercase">
          Sign up
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-white"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-gradient-to-r from-white to-gray-400 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
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
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white"
            >
              Password Confirmation
            </label>
            <input
              type="password"
              id="password_confirmation"
              value={form.password_confirmation}
              onChange={(e) =>
                setForm({ ...form, password_confirmation: e.target.value })
              }
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-gradient-to-r from-white to-gray-400 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-purple-600"
            >
              Sign up
            </button>
          </div>
          <p className="mt-4 text-xs text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 hover:text-blue-600">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
