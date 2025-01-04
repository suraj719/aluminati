import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      setIsChangingPassword(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/alumni/change-password`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1]
            }`,
          },
        }
      );
      setIsChangingPassword(false);
      if (response.data.success) {
        toast.success(response.data.message);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsChangingPassword(false);
      toast.error("Something went wrong!");
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/alumni/delete-account`,
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1]
            }`,
          },
        }
      );
      setIsDeleting(false);
      if (response.data.success) {
        toast.success(response.data.message);
        Cookies.remove("token");
        navigate("/");
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsDeleting(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-900 w-full max-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="flex justify-around w-full">
        <div className="w-[30%]">
          <div>
            <h2 className="text-xl font-semibold">Change Password</h2>
            <p className="text-gray-400">
              Update your account password to keep your account secure.
            </p>
          </div>
        </div>
        <div className="w-[70%]">
          <form
            onSubmit={changePassword}
            className="bg-gray-00 rounded-lg space-y-4"
          >
            <div>
              <label className="block text-gray-400 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                onChange={handlePasswordChange}
                value={passwordData.currentPassword}
                required
                className="w-full px-3 py-2 bg-transparent border focus:border-indigo-400 rounded-lg shadow-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                onChange={handlePasswordChange}
                value={passwordData.newPassword}
                required
                className="w-full px-3 py-2 bg-transparent border focus:border-indigo-400 rounded-lg shadow-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm new password"
                onChange={handlePasswordChange}
                value={passwordData.confirmNewPassword}
                required
                className="w-full px-3 py-2 bg-transparent border focus:border-indigo-400 rounded-lg shadow-sm outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isChangingPassword}
              className={`w-full px-4 py-2 font-medium text-white rounded-lg duration-150 ${
                isChangingPassword
                  ? "cursor-wait bg-gray-500"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {isChangingPassword ? "Changing Password..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>

      <hr className="w-full my-5 border-gray-700" />

      <div className="flex justify-around w-full">
        <div className="w-[30%]">
          <div>
            <h2 className="text-xl font-semibold">Delete account</h2>
            <p className="text-gray-400">
              No longer want to use our service? You can delete your account
              here. This action is not reversible. All information related to
              this account will be deleted permanently.
            </p>
          </div>
        </div>
        <div className="w-[70%]">
          <div className="rounded-lg flex">
            <button
              onClick={deleteAccount}
              disabled={isDeleting}
              className={`px-4 py-2 font-medium text-white rounded-lg duration-150 ${
                isDeleting
                  ? "cursor-wait bg-gray-500"
                  : "bg-red-600 hover:bg-red-500"
              }`}
            >
              {isDeleting ? "Deleting Account..." : "Yes, delete my account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
