import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CreateJob = () => {
  const { startup } = useSelector((state) => state.startup);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    location: "",
    description: "",
    salary: "",
    deadline: "",
    companyName: startup?.companyName || "",
    companyLogo: startup?.logo || "",
    companyId: startup?._id || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/startup/create-job`,
        jobDetails
      );
      if (response.data.success) {
        toast.success("Job posted successfully!");
        setJobDetails({
          title: "",
          location: "",
          description: "",
          salary: "",
          deadline: "",
          companyName: startup?.companyName || "",
          companyLogo: startup?.logo || "",
          companyId: startup?._id || "",
        });
      } else {
        toast.error("Failed to create the job posting.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-gray-900 w-full text-white flex scrollbar-custom pe-4"
      style={{
        height: "95%",
        overflow: "auto",
      }}
    >
      <div className="w-full rounded-lg shadow-lg">
        <h2 className="text-2xl  mb-6">Create a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-medium mb-2 block">Job Title</label>
            <input
              type="text"
              name="title"
              value={jobDetails.title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
              className="dark:[color-scheme:dark] appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="font-medium mb-2 block">Location</label>
            <input
              type="text"
              name="location"
              value={jobDetails.location}
              onChange={handleChange}
              placeholder="Enter job location"
              required
              className="dark:[color-scheme:dark] appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="font-medium mb-2 block">Job Description</label>
            <textarea
              name="description"
              value={jobDetails.description}
              onChange={handleChange}
              placeholder="Provide a brief job description"
              required
              className="dark:[color-scheme:dark] appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
              rows="4"
            />
          </div>
          <div>
            <label className="font-medium mb-2 block">Salary Range</label>
            <input
              type="text"
              name="salary"
              value={jobDetails.salary}
              onChange={handleChange}
              placeholder="Enter salary range (e.g., $50,000 - $70,000)"
              required
              className="dark:[color-scheme:dark] appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="font-medium mb-2 block">
              Application Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={jobDetails.deadline}
              onChange={handleChange}
              required
              className="dark:[color-scheme:dark] appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "cursor-not-allowed bg-gray-500"
                  : "bg-indigo-600 hover:bg-indigo-500"
              } px-6 py-2 text-white rounded-lg shadow-md duration-150`}
            >
              {isLoading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
