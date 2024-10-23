import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import { notification } from "antd";
import { changeSettings, getUser } from "../lib/api";

function Settings() {
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const userMutation = useMutation(
    (args: [string, string]) => {
      return changeSettings(...args);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
  };
  const [settingForm, setSettingForm] = useState(initialValues);

  const handleCancel = () => setSettingForm(initialValues);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userMutation.mutate([settingForm.name, settingForm.email]);
    notification.success({
      message: "Successfull save",
      description: "Your settings has been saved",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <Dashboard>
      <form onSubmit={handleSubmit} className="">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white uppercase">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-white">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md sm:max-w-md">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      value={settingForm.name}
                      onChange={(e) =>
                        setSettingForm({ ...settingForm, name: e.target.value })
                      }
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-gradient-to-r from-white to-gray-400 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md sm:max-w-md">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={settingForm.email}
                      onChange={(e) =>
                        setSettingForm({
                          ...settingForm,
                          email: e.target.value,
                        })
                      }
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-gradient-to-r from-white to-gray-400 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-white hover:bg-purple-300 hover:shadow-sm px-3 rounded-md py-2 cursor-pointer"
            onClick={handleCancel}
          >
            Mégse
          </button>
          <button
            type="submit"
            className="w-fit px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-purple-600"
          >
            Save
          </button>
        </div>
      </form>
    </Dashboard>
  );
}

export default Settings;
