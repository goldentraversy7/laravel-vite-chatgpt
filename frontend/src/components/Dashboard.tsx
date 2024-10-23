import Navbar from "./Navbar";
import { useGetUserQuery } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { DashboardProps } from "../lib/interfaces";

function Dashboard({ children }: DashboardProps) {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetUserQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!user) {
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-400">
      <Navbar user={user} />
      <main className="">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

export default Dashboard;
