import React from "react";
import Cookies from "js-cookie";
import SideBar from "./SideBar";

export default function CollegeSettings() {
  const handleLogout = () => {
    Cookies.remove("admin-token");
    window.location.replace("/");
  };
  return (
    <div className="flex w-full">
      <div>
        <SideBar />
      </div>
      <div className="w-full m-4">
        <div>
          <h2 className="text-xl text-white font-bold">Settings</h2>
          <button
            className="px-4 py-2 my-5 bg-red-600 rounded-lg hover:bg-red-700"
            onClick={handleLogout}
          >
            close session
          </button>
        </div>
      </div>
    </div>
  );
}
