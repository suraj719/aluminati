import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CollegeLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const collegeLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (
        formData.email === "admin@aluminati.com" &&
        formData.password === "admin"
      ) {
        Cookies.set("admin-token", "admin", { expires: 10 / (24 * 60) });
        navigate("/college/dashboard");
        toast.success("Logged in successfully!");
      } else {
        Cookies.remove("admin-token");
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const token = Cookies.get("admin-token");
    if (token) {
      navigate("/college/dashboard");
    }
  }, []);

  return (
    <>
      <div className="bg-gray-900 w-full h-[90%] text-white flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full  space-y-5">
          <div className="text-center pb-3">
            {/* <p className="font-bold text-2xl">Aluminati</p> */}
            <div className="mt-">
              <h3 className="text-xl font-bold sm:text-3xl">
                Log in to college account
              </h3>
            </div>
          </div>
          <form onSubmit={collegeLogin} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                onChange={handleChange}
                required
                className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-400 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-400 shadow-sm rounded-lg"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "cursor-wait disable bg-gray-500"
                  : "bg-indigo-600 active:bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600"
              } w-full px-4 py-2 text-white font-medium   rounded-lg duration-150`}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
