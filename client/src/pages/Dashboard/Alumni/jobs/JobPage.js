import { useParams, Link } from "react-router-dom";
import {
  ClipboardDocumentIcon,
  ShareIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../../redux/alerts";

export default function JobPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/startup/job/${jobId}`,
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
        setJob(response.data.job);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong!");
    }
    dispatch(HideLoading());
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!job) {
    return (
      <div className="bg-gray-900 text-gray-200 p-8">
        <h1 className="text-3xl font-bold">Job Not Found</h1>
        <p className="mt-4">The job you're looking for does not exist.</p>
        <Link
          to="/dashboard/jobs"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-200 p-8 pt-0 max-h-screen">
      <div className="w-full">
        <Link
          to="/dashboard/jobs"
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
          &larr; Back to Jobs
        </Link>

        <div className="bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold">{job.title}</h1>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-blue-700 text-white px-3 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                  <UserPlusIcon className="h-5 w-5" />
                  Apply
                </button>
                <button className="flex items-center gap-2 bg-green-700 text-white px-3 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200">
                  <ShareIcon className="h-5 w-5" />
                  Share
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link Copied to Clipboard");
                  }}
                  className="flex items-center gap-2 bg-gray-700 text-white px-3 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  Copy Link
                </button>
              </div>
            </div>

            <p className="text-gray-400">
              {job.salary ? `$${job.salary} per year` : "Salary not disclosed"}{" "}
              - {job.location}
            </p>
            <p className="leading-relaxed text-lg">{job.description}</p>
            <p className="text-sm text-gray-500">
              Posted on: {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
