import React, { useEffect, useState } from "react";
// import CreateEvent from "./createEvent";
// import CreateNews from "./createNews";
import Cookies from "js-cookie";
import CreateJob from "./CreateJob";

const StartupDashboard = () => {
  const [activeTab, setActiveTab] = useState("news");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const token = Cookies.get("startup-token");
    if (!token) {
      window.location.replace("/startup/login");
    }
  }, [activeTab]);
  return (
    <div
      className="bg-gray-900  text-white flex flex-col w-full scrollbar-custom"
      style={{
        height: "90vh",
        overflow: "auto",
      }}
    >
      <div className="flex flex-grow h-full">
        {/* Sidebar */}
        <aside className="bg-gray-800 w-64 h-full px-4 flex flex-col space-y-2">
          <button
            className={`py-3 px-4 rounded-lg text-left ${
              activeTab === "news" ? "bg-indigo-600" : "hover:bg-gray-700"
            }`}
            onClick={() => handleTabChange("news")}
          >
            Create Job
          </button>
          <button
            className={`py-3 px-4 rounded-lg text-left ${
              activeTab === "profile" ? "bg-indigo-600" : "hover:bg-gray-700"
            }`}
            onClick={() => handleTabChange("profile")}
          >
            Edit Profile
          </button>
          <button
            className={`py-3 px-4 rounded-lg text-left ${
              activeTab === "settings" ? "bg-indigo-600" : "hover:bg-gray-700"
            }`}
            onClick={() => handleTabChange("settings")}
          >
            Settings
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-grow h-full p-6 bg-gray-900">
          {activeTab === "news" && <CreateJob />}
          {/* {activeTab === "events" && <CreateEvent />}
          {activeTab === "settings" && <AdminSettings />} */}
        </main>
      </div>
    </div>
  );
};

const StartupSettings = () => {
  const handleLogout = () => {
    Cookies.remove("admin-token");
    window.location.replace("/");
  };
  return (
    <div>
      <h2 className="text-xl font-bold">Settings</h2>
      <button
        className="px-4 py-2 my-5 bg-red-600 rounded-lg hover:bg-red-700"
        onClick={handleLogout}
      >
        close session
      </button>
    </div>
  );
};

export default StartupDashboard;
