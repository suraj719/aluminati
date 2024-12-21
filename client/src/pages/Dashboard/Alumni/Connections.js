import React, { useState } from "react";

const alumniList = [
  {
    name: "John Doe",
    graduationYear: 2010,
    profession: "Software Engineer",
    bio: "Passionate about coding and technology.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Jane Smith",
    graduationYear: 2012,
    profession: "Data Scientist",
    bio: "Loves data and analytics.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Michael Johnson",
    graduationYear: 2015,
    profession: "Product Manager",
    bio: "Focused on product development and management.",
    image: "https://via.placeholder.com/150",
  },
];

export default function Connections() {
  const [requests, setRequests] = useState([]);

  const sendRequest = (name) => {
    setRequests([...requests, name]);
  };

  return (
    <div className="p-8 pt-0 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Connect with Alumni</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {alumniList.map((alumni, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col items-center"
          >
            <img
              src={alumni.image}
              alt={alumni.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{alumni.name}</h2>
            <p className="text-gray-400 mb-1">
              Graduation Year: {alumni.graduationYear}
            </p>
            <p className="text-gray-400 mb-4 text-center">{alumni.bio}</p>
            <button
              onClick={() => sendRequest(alumni.name)}
              className={`px-4 py-2 rounded-lg ${
                requests.includes(alumni.name) ? "bg-green-600" : "bg-blue-600"
              } hover:bg-blue-700 focus:outline-none`}
              disabled={requests.includes(alumni.name)}
            >
              {requests.includes(alumni.name) ? "Request Sent" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
