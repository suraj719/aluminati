import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AlumniSignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const AlumniSignup = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/alumni/signup`,
        formData
      );
      setIsLoading(false);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/"); // Redirect to home or login after successful signup
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="w-full flex h-[90%]">
        <div className="relative flex-1 hidden items-center justify-center h-full  lg:flex">
          <div className="relative z-10 w-full max-w-md">
            <div className=" mt-16 space-y-3">
              <h3 className="text-white text-3xl font-bold">
                Start Connecting and Grow Your Network
              </h3>
              <p className="text-gray-300">
                Create an account with university provided mail address and
                access all features. Connect with alumni, students, and the
                college effortlessly, and start building valuable relationships.
              </p>
              <div className="flex items-center -space-x-2 overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/79.jpg"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://randomuser.me/api/portraits/men/86.jpg"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <p className="text-sm text-gray-400 font-medium translate-x-5">
                  5,000+ alumni joined
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
                <p className="">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-3">
              <button className="flex items-center justify-center py-2.5 border rounded-lg bg-gray-50 duration-150 hover:bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-6 h-6"
                  viewBox="0 0 48 48"
                >
                  <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                </svg>
              </button>
              <button className="flex items-center justify-center py-2.5 border rounded-lg bg-gray-50 duration-150 hover:bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-6 h-6"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#0078d4"
                    d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
                  ></path>
                  <path
                    d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                    opacity=".05"
                  ></path>
                  <path
                    d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                    opacity=".07"
                  ></path>
                  <path
                    fill="#fff"
                    d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                  ></path>
                </svg>
              </button>

              <button className="flex items-center justify-center py-2.5 border rounded-lg bg-gray-50 duration-150 hover:bg-gray-300">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_910_21)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24.0005 1C18.303 1.00296 12.7923 3.02092 8.45374 6.69305C4.11521 10.3652 1.23181 15.452 0.319089 21.044C-0.593628 26.636 0.523853 32.3684 3.47174 37.2164C6.41963 42.0643 11.0057 45.7115 16.4099 47.5059C17.6021 47.7272 18.0512 46.9883 18.0512 46.36C18.0512 45.7317 18.0273 43.91 18.0194 41.9184C11.3428 43.3608 9.93197 39.101 9.93197 39.101C8.84305 36.3349 7.26927 35.6078 7.26927 35.6078C5.09143 34.1299 7.43223 34.1576 7.43223 34.1576C9.84455 34.3275 11.1123 36.6194 11.1123 36.6194C13.2504 40.2667 16.7278 39.2116 18.0949 38.5952C18.3095 37.0501 18.9335 35.999 19.621 35.4023C14.2877 34.8017 8.68408 32.7548 8.68408 23.6108C8.65102 21.2394 9.53605 18.9461 11.156 17.2054C10.9096 16.6047 10.087 14.1785 11.3905 10.8829C11.3905 10.8829 13.4054 10.2427 17.9916 13.3289C21.9253 12.2592 26.0757 12.2592 30.0095 13.3289C34.5917 10.2427 36.6026 10.8829 36.6026 10.8829C37.9101 14.1706 37.0875 16.5968 36.8411 17.2054C38.4662 18.9464 39.353 21.2437 39.317 23.6187C39.317 32.7824 33.7015 34.8017 28.3602 35.3905C29.2186 36.1334 29.9856 37.5836 29.9856 39.8122C29.9856 43.0051 29.9578 45.5736 29.9578 46.36C29.9578 46.9962 30.391 47.7391 31.6071 47.5059C37.0119 45.7113 41.5984 42.0634 44.5462 37.2147C47.4941 32.3659 48.611 26.6326 47.6972 21.0401C46.7835 15.4476 43.8986 10.3607 39.5587 6.68921C35.2187 3.01771 29.7067 1.00108 24.0085 1H24.0005Z"
                      fill="#191717"
                    />
                    <path
                      d="M9.08887 35.264C9.03721 35.3826 8.84645 35.4181 8.69146 35.3351C8.53646 35.2522 8.42122 35.098 8.47686 34.9755C8.5325 34.853 8.71928 34.8214 8.87428 34.9044C9.02927 34.9874 9.14848 35.1455 9.08887 35.264Z"
                      fill="#191717"
                    />
                    <path
                      d="M10.0626 36.3428C9.98028 36.384 9.88612 36.3955 9.79622 36.3753C9.70632 36.3551 9.62629 36.3045 9.56979 36.2321C9.41479 36.0662 9.38298 35.837 9.50221 35.7342C9.62143 35.6315 9.83606 35.6789 9.99105 35.8449C10.146 36.0108 10.1818 36.24 10.0626 36.3428Z"
                      fill="#191717"
                    />
                    <path
                      d="M11.0085 37.714C10.8614 37.8167 10.6111 37.714 10.472 37.5085C10.4335 37.4716 10.4029 37.4274 10.382 37.3785C10.3611 37.3297 10.3503 37.2771 10.3503 37.224C10.3503 37.1709 10.3611 37.1183 10.382 37.0694C10.4029 37.0205 10.4335 36.9763 10.472 36.9395C10.619 36.8407 10.8694 36.9395 11.0085 37.141C11.1476 37.3425 11.1516 37.6112 11.0085 37.714Z"
                      fill="#191717"
                    />
                    <path
                      d="M12.2921 39.0417C12.161 39.1879 11.8947 39.1484 11.6761 38.9508C11.4575 38.7532 11.4059 38.4845 11.537 38.3423C11.6682 38.2 11.9344 38.2395 12.161 38.4331C12.3875 38.6268 12.4312 38.8994 12.2921 39.0417Z"
                      fill="#191717"
                    />
                    <path
                      d="M14.0923 39.8162C14.0327 40.0019 13.7625 40.0849 13.4922 40.0059C13.222 39.9268 13.0432 39.7055 13.0948 39.5159C13.1465 39.3262 13.4207 39.2393 13.6949 39.3262C13.9691 39.4131 14.144 39.6226 14.0923 39.8162Z"
                      fill="#191717"
                    />
                    <path
                      d="M16.0557 39.9505C16.0557 40.1442 15.8331 40.3101 15.547 40.3141C15.2608 40.318 15.0264 40.16 15.0264 39.9663C15.0264 39.7727 15.2489 39.6067 15.535 39.6028C15.8212 39.5988 16.0557 39.753 16.0557 39.9505Z"
                      fill="#191717"
                    />
                    <path
                      d="M17.8838 39.6463C17.9196 39.8399 17.7208 40.0414 17.4347 40.0888C17.1486 40.1363 16.8982 40.0217 16.8624 39.832C16.8267 39.6423 17.0333 39.4368 17.3115 39.3855C17.5897 39.3341 17.848 39.4526 17.8838 39.6463Z"
                      fill="#191717"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_910_21">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-1">
              <hr className="sm:w-[35%] w-[30%]"></hr>
              <p>Or continue with</p>
              <hr className="sm:w-[35%] w-[30%]" />
            </div>
            <form onSubmit={AlumniSignup} className="space-y-5">
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Full Name"
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
                  placeholder="Enter your college email address"
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
                } w-full px-4 py-2 text-white font-medium  rounded-lg duration-150`}
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
