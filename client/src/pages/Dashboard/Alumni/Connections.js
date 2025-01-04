import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Connections = () => {
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [batchmates, setBatchmates] = useState([]);
  const [filteredBatchmates, setFilteredBatchmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);

  const fetchBatchmates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/alumni/get-all-alumni`,
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
      if (response.data.success) {
        const data = response.data.data;

        // Extract unique branches and years
        const uniqueBranches = [
          ...new Set(data.map((item) => item.major).filter(Boolean)),
        ];
        const uniqueYears = [
          ...new Set(data.map((item) => item.graduationYear).filter(Boolean)),
        ];

        setBatchmates(data);
        setBranches(uniqueBranches);
        setYears(uniqueYears);
        setFilteredBatchmates(data); // Initially show all data
      } else {
        toast.error("Failed to fetch alumni data.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching alumni data.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filtered = batchmates.filter((batchmate) => {
      const matchesSearch = `${batchmate.firstName} ${batchmate.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesBranch =
        selectedBranch === "" || batchmate.major === selectedBranch;
      const matchesYear =
        selectedYear === "" ||
        batchmate.graduationYear === Number(selectedYear);
      return matchesSearch && matchesBranch && matchesYear;
    });
    setFilteredBatchmates(filtered);
  };

  useEffect(() => {
    fetchBatchmates();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, selectedBranch, selectedYear]);

  return (
    <div className="bg-gray-900 max-h-screen p-8 pt-0 text-white">
      <h1 className="text-3xl font-bold mb-6">Connect with Alumni</h1>
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
            <option value="">All Branches</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="flex-1 p-2 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white"></div>
        </div>
      ) : filteredBatchmates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBatchmates.map((batchmate) => (
            <div
              key={batchmate._id}
              className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={batchmate.profilePicture || "/images/defppic.jpg"}
                alt={`${batchmate.firstName} ${batchmate.lastName}'s profile`}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <Link to={`/dashboard/profile/${batchmate._id}`}>
                <h3 className="text-lg font-semibold hover:underline">
                  {batchmate?.firstName} {batchmate?.lastName}
                </h3>
              </Link>
              {batchmate.currentJobTitle && batchmate.currentCompany && (
                <p className="text-gray-400 text-sm">
                  {batchmate.currentJobTitle} at {batchmate.currentCompany}
                </p>
              )}

              <p className="text-gray-500 text-xs mt-2">
                {batchmate.major} • {batchmate.graduationYear}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No alumni found</p>
      )}
    </div>
  );
};

export default Connections;
