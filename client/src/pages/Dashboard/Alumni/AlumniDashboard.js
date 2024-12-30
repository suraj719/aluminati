import React from "react";
import {
  UserGroupIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChatBubbleBottomCenterIcon,
  NewspaperIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const AlumniDashboard = () => {
  const { alumni } = useSelector((state) => state.alumni);
  return (
    <div className="bg-gray-900 min-h-screen p-8 pt-0 text-white">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {alumni?.firstName}!</h1>
        <p className="text-gray-400 text-sm">
          Stay connected and explore what's happening in the alumni community.
        </p>
      </div>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Alumni Highlights */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Alumni Highlights</h2>
          <p className="text-sm mb-2">
            <UserGroupIcon className="h-5 w-5 inline-block mr-2 text-blue-400" />
            John Doe started a new position at ABC Corp.
          </p>
          <p className="text-sm mb-2">
            <UserGroupIcon className="h-5 w-5 inline-block mr-2 text-blue-400" />
            Jane Smith published a research paper on AI ethics.
          </p>
          <p className="text-sm">
            <UserGroupIcon className="h-5 w-5 inline-block mr-2 text-blue-400" />
            Michael Brown was awarded "Entrepreneur of the Year."
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-sm mb-2">
            <CalendarIcon className="h-5 w-5 inline-block mr-2 text-yellow-400" />
            Alumni Meetup - Nov 10, 2024
          </p>
          <p className="text-sm mb-2">
            <CalendarIcon className="h-5 w-5 inline-block mr-2 text-yellow-400" />
            Webinar on Career Development - Nov 15, 2024
          </p>
          <p className="text-sm">
            <CalendarIcon className="h-5 w-5 inline-block mr-2 text-yellow-400" />
            Annual Homecoming - Dec 5, 2024
          </p>
        </div>

        {/* Job Opportunities */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Job Opportunities</h2>
          <p className="text-sm mb-2">
            <BriefcaseIcon className="h-5 w-5 inline-block mr-2 text-green-400" />
            Software Engineer at XYZ Solutions
          </p>
          <p className="text-sm mb-2">
            <BriefcaseIcon className="h-5 w-5 inline-block mr-2 text-green-400" />
            Marketing Manager at Creative Agency
          </p>
          <p className="text-sm">
            <BriefcaseIcon className="h-5 w-5 inline-block mr-2 text-green-400" />
            Data Analyst at FinTech Corp
          </p>
        </div>

        {/* Recent Connections */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Connections</h2>
          <p className="text-sm mb-2">
            <ChatBubbleBottomCenterIcon className="h-5 w-5 inline-block mr-2 text-purple-400" />
            You connected with Emily Davis.
          </p>
          <p className="text-sm mb-2">
            <ChatBubbleBottomCenterIcon className="h-5 w-5 inline-block mr-2 text-purple-400" />
            You received a message from Richard Lee.
          </p>
          <p className="text-sm">
            <ChatBubbleBottomCenterIcon className="h-5 w-5 inline-block mr-2 text-purple-400" />
            Mary Johnson liked your post.
          </p>
        </div>

        {/* Institution News */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Institution News</h2>
          <p className="text-sm mb-2">
            <NewspaperIcon className="h-5 w-5 inline-block mr-2 text-pink-400" />
            University ranked among the top 10 for engineering.
          </p>
          <p className="text-sm mb-2">
            <NewspaperIcon className="h-5 w-5 inline-block mr-2 text-pink-400" />
            New campus facilities inaugurated.
          </p>
          <p className="text-sm">
            <NewspaperIcon className="h-5 w-5 inline-block mr-2 text-pink-400" />
            Alumni donations reached a record high this year.
          </p>
        </div>

        {/* Mentorship Programs */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Mentorship Programs</h2>
          <p className="text-sm mb-2">
            <AcademicCapIcon className="h-5 w-5 inline-block mr-2 text-blue-400" />
            Apply to be a mentor for current students.
          </p>
          <p className="text-sm">
            <AcademicCapIcon className="h-5 w-5 inline-block mr-2 text-blue-400" />
            Find a mentor to guide your career path.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;
