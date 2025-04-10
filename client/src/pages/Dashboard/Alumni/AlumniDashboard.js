import React from "react";
import {
  UserGroupIcon,
  BriefcaseIcon,
  CalendarIcon,
  NewspaperIcon,
  MapIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AlumniDashboard = () => {
  // Static alumni info
  const { alumni } = useSelector((state) => state.alumni);

  // Quote of the day
  const quote = {
    text: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "W.B. Yeats",
  };

  // Links to other routes in the app
  const quickLinks = [
    {
      name: "Events",
      icon: CalendarIcon,
      path: "/dashboard/events",
      color: "bg-yellow-600",
    },
    {
      name: "Jobs",
      icon: BriefcaseIcon,
      path: "/dashboard/jobs",
      color: "bg-green-600",
    },
    {
      name: "Explore",
      icon: SparklesIcon,
      path: "/dashboard/explore",
      color: "bg-purple-600",
    },
    {
      name: "Connect",
      icon: UserGroupIcon,
      path: "/dashboard/connect",
      color: "bg-blue-600",
    },
    {
      name: "News",
      icon: NewspaperIcon,
      path: "/dashboard/news",
      color: "bg-pink-600",
    },
    {
      name: "Nearby",
      icon: MapIcon,
      path: "/dashboard/nearby",
      color: "bg-indigo-600",
    },
  ];

  return (
    <div className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-white">
      {/* Hero Banner with Quote */}
      <div className="mb-8 bg-gradient-to-r from-blue-800 to-indigo-900 rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 L100,0 L100,100 L0,100 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              ></path>
              <path
                d="M0,0 L100,100 M100,0 L0,100"
                stroke="currentColor"
                strokeWidth="0.5"
              ></path>
            </svg>
          </div>

          <div className="relative p-8 md:p-12">
            {/* User welcome */}
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex items-center mb-6 md:mb-0">
                <img
                  src={alumni?.profilePicture || "/images/defppic.jpg"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-4 border-blue-400 shadow-lg"
                />
                <div className="ml-4">
                  <h1 className="text-3xl font-bold">
                    Welcome, {alumni.firstName}!
                  </h1>
                  <p className="text-blue-200">It's good to have you back</p>
                </div>
              </div>
            </div>

            {/* Inspirational quote */}
            <div className="mt-8">
              <blockquote className="italic text-xl text-blue-100">
                "{quote.text}"
              </blockquote>
              <p className="mt-2 text-blue-300 text-right">— {quote.author}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <SparklesIcon className="h-6 w-6 mr-2 text-blue-400" />
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`${link.color} mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3`}
              >
                <link.icon className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Inspiration Footer */}
      <div className="mt-10 text-center">
        <p className="text-gray-400 italic">
          "The roots of education are bitter, but the fruit is sweet." —
          Aristotle
        </p>
      </div>
    </div>
  );
};

export default AlumniDashboard;
