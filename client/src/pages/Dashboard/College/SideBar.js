import React, { useEffect, useState } from "react";
import CreateEvent from "./CollegecreateEvent";
import CreateNews from "./createNews";
import Cookies from "js-cookie";
import Events from "./CollegeEvents";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const SideBar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("news");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const token = Cookies.get("admin-token");
    if (!token) {
      window.location.replace("/college");
    }
  }, [activeTab]);

  return (
    <div
      className="bg-gray-900  text-white flex flex-col scrollbar-custom"
      style={{
        height: "90vh",
        overflow: "auto",
      }}
    >
      <div className="flex flex-grow h-full">
        {/* Sidebar */}
        <aside className="bg-gray-800 w-64 h-full px-4 flex flex-col space-y-2">
          <Link to="/college/news">
            <button
              className={`py-3 px-4 rounded-lg text-left ${
                location.pathname === "/college/news"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
            >
              Create News
            </button>
          </Link>
          <Link to="/college/events">
            <button
              className={`py-3 px-4 rounded-lg text-left ${
                location.pathname === "/college/events"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
            >
              Create Events
            </button>
          </Link>
          <Link to="/college/settings">
            <button
              className={`py-3 px-4 rounded-lg text-left ${
                location.pathname === "/college/settings"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
            >
              Settings
            </button>
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default SideBar;
