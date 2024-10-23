import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col bg-gradient-to-r from-blue-600 to-purple-400 justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-white uppercase">
          Welcome to the New Laravel React Chat Application
        </h1>
        <p className="text-center mt-4 text-white">
          Sign in to experience seamless real-time communication
        </p>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none focus:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
