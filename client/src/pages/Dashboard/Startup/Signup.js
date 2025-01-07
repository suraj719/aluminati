import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
// import { setStartup } from "../../redux/startup"; // Uncomment if using Redux for startup state
import Cookies from "js-cookie";

export default function StartupSignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartupSignup = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/startup/signup`,
        formData
      );
      setIsLoading(false);
      if (response.data.success) {
        Cookies.set("startup-token", response.data.data, { expires: 1 });
        toast.success(response.data.message);
        // dispatch(setStartup(response.data.user)); // Uncomment if using Redux
        navigate("/startup/onboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="w-full flex h-[90%]">
        <div className="relative flex-1 hidden items-center justify-center h-full lg:flex">
          <div className="relative z-10 w-full max-w-md">
            <div className="mt-16 space-y-3">
              <h3 className="text-white text-3xl font-bold">
                Start Growing Your Startup Today
              </h3>
              <p className="text-gray-300">
                Create an account to connect with investors, mentors, and other
                startups. Unlock growth opportunities and take your startup to
                the next level.
              </p>
              <div className="flex items-center -space-x-2 overflow-hidden">
                <img
                  alt="user-1"
                  src="https://randomuser.me/api/portraits/women/79.jpg"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  alt="user-2"
                  src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  alt="user-3"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  alt="user-4"
                  src="https://randomuser.me/api/portraits/men/86.jpg"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  alt="user-5"
                  src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <p className="text-sm text-gray-400 font-medium translate-x-5">
                  Join 1,000+ successful startups
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center h-full z-10">
          <div className="w-full max-w-md space-y-4 px-4 text-gray-300 sm:px-0">
            <div className="">
              <div className="mt-5 space-y-2">
                <h3 className="text-white text-2xl font-bold sm:text-3xl">
                  Sign up
                </h3>
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/startup/login"
                    className="font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
            <form onSubmit={handleStartupSignup} className="space-y-5">
              <div>
                <label className="font-medium">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter your startup name"
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-400 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your startup email"
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-400 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter a strong password"
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-400 shadow-sm rounded-lg"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`${
                  isLoading
                    ? "cursor-wait disable bg-gray-400"
                    : "bg-indigo-600 active:bg-indigo-600 hover:bg-indigo-500"
                } w-full px-4 py-2 text-white font-medium rounded-lg duration-150`}
              >
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 my-auto h-[500px] w-full -z-1"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
          filter: "blur(118px)",
        }}
      ></div>
    </>
  );
}
