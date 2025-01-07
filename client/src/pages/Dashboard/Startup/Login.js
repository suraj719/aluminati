import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setStartup } from "../../../redux/startup";
// import { setAlumni } from "../../redux/alumni";

export default function StartupLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const AlumniLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/startup/login`,
        formData
      );
      setIsLoading(false);
      if (response.data.success) {
        Cookies.set("startup-token", response.data.data, { expires: 1 });
        dispatch(setStartup(response.data.user));
        if (response.data.user.onboardingStatus === false) {
          navigate("/startup/onboard");
        } else {
          navigate("/startup/dashboard");
        }
        toast.success(response.data.message);
      } else {
        Cookies.remove("startup-token");
        navigate("/startup/login");
        dispatch(setStartup(null));
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    // const token = Cookies.get("token");
    // if (token) {
    //   navigate("/dashboard");
    // }
  }, []);

  return (
    <>
      <div className="bg-gray-900 w-full h-[90%] text-white flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full  space-y-5">
          <div className="text-center pb-3">
            {/* <p className="font-bold text-2xl">Aluminati</p> */}
            <div className="mt-">
              <h3 className="text-xl font-bold sm:text-3xl">
                Log in to your account
              </h3>
            </div>
          </div>
          <form onSubmit={AlumniLogin} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter startup email address"
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
                placeholder="Enter password"
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
          <p className="text-center">
            Don't have an account?{" "}
            <Link
              to="/startup/signup"
              className="font-medium text-indigo-500 hover:text-indigo-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
