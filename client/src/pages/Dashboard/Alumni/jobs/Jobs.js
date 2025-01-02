import { useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ShowLoading, HideLoading } from "../../../../redux/alerts";
import axios from "axios";

const Jobs = () => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/startup/jobs`,
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
        setJobs(response.data.jobs);
      } else {
        toast.error("Something went wrong!");
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter jobs based on the search query
  const filteredJobs = jobs?.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 pt-0">
      <h1 className="text-white font-extrabold text-3xl pb-8">Latest Jobs</h1>
      <form
        className="h-full flex flex-row w-full gap-2 items-center mb-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="Search Jobs by Title..."
            className="w-full h-12 px-3 py-2 bg-transparent outline-none border focus:border-indigo-400 shadow-sm rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className={`w-[20%] h-12 bg-indigo-600 hover:bg-indigo-500 px-4 text-white font-medium rounded-lg duration-150`}
        >
          Search
        </button>
      </form>

      <div className="text-white mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs?.length ? (
          filteredJobs.map((job) => (
            <div
              key={"job" + job._id}
              className="rounded-lg bg-gray-800 hover:bg-gray-700 p-6 space-y-4 shadow-md flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{job.title}</h2>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <img
                    src={"https://via.placeholder.com/50"}
                    alt={job.company}
                    className="h-10 rounded"
                  />
                  <span className="">{job.company}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPinIcon className="w-5 h-5 mr-1" />
                  <span>{job.location}</span>
                </div>
              </div>
              <p className="my-4 line-clamp-2">{job.description}</p>
              <Link to={`/dashboard/job/${job._id}`} className="w-full">
                <button className="mt-auto w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  More Details
                </button>
              </Link>
              {/* <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                More Details
              </button> */}
            </div>
          ))
        ) : (
          <div>No Jobs Found 😢</div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
