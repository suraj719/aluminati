import React, { useState } from "react";

const batchmates = [
  {
    id: 1,
    name: "John Doe",
    headline: "Software Engineer at Tech Co.",
    profilePicture: "https://via.placeholder.com/150",
    branch: "Computer Science",
    year: "2022",
  },
  {
    id: 2,
    name: "Jane Smith",
    headline: "Product Manager at Startup Inc.",
    profilePicture: "https://via.placeholder.com/150",
    branch: "Information Technology",
    year: "2023",
  },
  {
    id: 3,
    name: "Alice Johnson",
    headline: "Freelance Graphic Designer",
    profilePicture: "https://via.placeholder.com/150",
    branch: "Mechanical Engineering",
    year: "2021",
  },
  {
    id: 3,
    name: "Alice Johnson",
    headline: "Freelance Graphic Designer",
    profilePicture: "https://via.placeholder.com/150",
    branch: "Mechanical Engineering",
    year: "2021",
  },
  {
    id: 3,
    name: "Alice Johnson",
    headline: "Freelance Graphic Designer",
    profilePicture: "https://via.placeholder.com/150",
    branch: "Mechanical Engineering",
    year: "2021",
  },
  {
    id: 3,
    name: "Alice Johnson",
    headline: "Freelance Graphic Designer",
    profilePicture: "https://via.placeholder.com/150",
    branch: "Mechanical Engineering",
    year: "2021",
  },
  {
    id: 3,
    name: "Alice Johnson",
    headline: "Freelance Graphic Designer",
    profilePicture: "https://via.placeholder.com/150",
    branch: "Mechanical Engineering",
    year: "2021",
  },
  {
    id: 3,
    name: "Alice Johnson",
    headline: "Freelance Graphic Designer",
    profilePicture: "https://via.placeholder.com/150",
    branch: "Mechanical Engineering",
    year: "2021",
  },
];

const Batch = () => {
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const filteredBatchmates = batchmates.filter((batchmate) => {
    return (
      batchmate.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedBranch === "" || batchmate.branch === selectedBranch) &&
      (selectedYear === "" || batchmate.year === selectedYear)
    );
  });

  return (
    <div className="bg-gray-900 min-h-screen p-8 pt-0 text-white">
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600"
          />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="flex-1 p-2 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600"
          >
            <option value="">Your Branch</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="flex-1 p-2 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600"
          >
            <option value="">Your Year</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBatchmates.map((batchmate) => (
          <div
            key={batchmate.id}
            className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={batchmate.profilePicture}
              alt={`${batchmate.name}'s profile`}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{batchmate.name}</h3>
            <p className="text-gray-400 text-sm">{batchmate.headline}</p>
            <p className="text-gray-500 text-xs mt-2">
              {batchmate.branch} • {batchmate.year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Batch;
