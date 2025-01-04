import { Tooltip as ReactToolTip } from "react-tooltip";
import { useLocation, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
const AlumniSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
    window.location.reload();
  };
  const navigation = [
    {
      href: ["/dashboard"],
      name: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          strokeWidth={1.5}
          fill="currentColor"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
        </svg>
      ),
    },
    {
      href: [
        "/dashboard/events",
        "/dashboard/event/",
        "/dashboard/create-event",
      ],
      name: "Events",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          strokeWidth={1.5}
          fill="currentColor"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
        </svg>
      ),
    },
    {
      href: ["/dashboard/jobs", "/dashboard/job/"],
      name: "Jobs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          strokeWidth={1.5}
          fill="currentColor"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
        </svg>
      ),
    },
    {
      href: ["/dashboard/connect", "/dashboard/profile/"],
      name: "Connect",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          strokeWidth={1.5}
          fill="currentColor"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" />
        </svg>
      ),
    },
    {
      href: ["/dashboard/explore", "/dashboard/create-post"],
      name: "Explore",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="80 -960 960 960"
          strokeWidth={1.5}
          fill="currentColor"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path d="m300-300 280-80 80-280-280 80-80 280Zm180-120q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm0-320Z" />
        </svg>
      ),
    },
    {
      href: ["javascript:void(0)"],
      name: "Nearby",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="120 -960 960 960"
          strokeWidth={1.5}
          fill="currentColor"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path d="M516-120 402-402 120-516v-56l720-268-268 720h-56Zm26-148 162-436-436 162 196 78 78 196Zm-78-196Z" />
        </svg>
      ),
    },
    {
      href: ["/dashboard/news"],
      name: "news",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          strokeWidth={1.5}
          fill="currentColor"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path d="M640-440v-80h160v80H640Zm48 280-128-96 48-64 128 96-48 64Zm-80-480-48-64 128-96 48 64-128 96ZM120-360v-240h160l200-200v640L280-360H120Zm280-246-86 86H200v80h114l86 86v-252ZM300-480Z" />
        </svg>
      ),
    },
    {
      href: ["/dashboard/settings"],
      name: "Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      href: [""],
      onclick: handleLogout,
      name: "Logout",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className="">
      <div
        className={`${
          open ? "w-70" : "w-24"
        } bg-gray-800 rounded-lg text-gray-100 h-full flex flex-col justify-center p-5 pt-8 relative duration-300 overflow-y-auto`}
      >
        {/* Toggle Arrow */}
        <div
          className={`cursor-pointer mx-auto top-9 w-7 text-white ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            viewBox="0 -960 960 960"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        </div>

        {/* Main Content: Navigation Links */}
        <div className="flex-grow">
          <ul
            className={`pt-5 flex flex-col ${
              !open ? "items-center" : "items-start"
            } space-y-3`}
          >
            {navigation.map((menu, index) => (
              <Link
                className={`${open ? "w-full" : ""}`}
                key={index}
                to={menu?.href[0]}
              >
                <li
                  data-tooltip-id={`td-${menu.name}`}
                  onClick={menu.onclick}
                  className={`rounded-lg w-full flex items-center p-2 cursor-pointer hover:bg-gray-700 hover:text-white text-gray-400 text-sm gap-x-4 ${
                    Array.isArray(menu.href) &&
                    menu.href.some((path) => {
                      const normalizedPath = path.toLowerCase();
                      const normalizedLocation =
                        location.pathname.toLowerCase();
                      if (normalizedPath === "") return false;
                      if (normalizedPath === "/dashboard") {
                        return normalizedLocation === "/dashboard";
                      }
                      if (
                        normalizedLocation.startsWith(normalizedPath) &&
                        normalizedLocation !== "/dashboard"
                      ) {
                        return true;
                      }

                      return false;
                    })
                      ? "bg-gray-700"
                      : ""
                  }`}
                >
                  {menu.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menu.name}
                  </span>
                  {!open && (
                    <ReactToolTip
                      id={`td-${menu.name}`}
                      place="right"
                      content={menu.name}
                      className="tooltip-dark"
                    />
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlumniSideBar;
