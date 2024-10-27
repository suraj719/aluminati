import { MapPinIcon, HeartIcon } from "@heroicons/react/24/outline";

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: {
        name: "Tech Corp",
        logo_url: "https://via.placeholder.com/50",
      },
      location: "San Francisco, CA",
      description:
        "Developing and maintaining the front end of web applications.Developing and maintaining the front end of web applications.Developing and maintaining the front end of web applications.",
      saved: false,
    },
    {
      id: 2,
      title: "Backend Developer",
      company: {
        name: "Dev Solutions",
        logo_url: "https://via.placeholder.com/50",
      },
      location: "New York, NY",
      description:
        "Building and optimizing server-side applications.Developing and maintaining the front end of web applications.",
      saved: true,
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: {
        name: "Innovatech",
        logo_url: "https://via.placeholder.com/50",
      },
      location: "Austin, TX",
      description:
        "Working on both frontend and backend components of projects.",
      saved: false,
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: {
        name: "Innovatech",
        logo_url: "https://via.placeholder.com/50",
      },
      location: "Austin, TX",
      description:
        "Working on both frontend and backend components of projects.",
      saved: false,
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: {
        name: "Innovatech",
        logo_url: "https://via.placeholder.com/50",
      },
      location: "Austin, TX",
      description:
        "Working on both frontend and backend components of projects.",
      saved: false,
    },
  ];

  return (
    <div className="p-8 pt-0">
      <h1 className=" text-white font-extrabold text-3xl  pb-8">
        Latest Jobs
      </h1>
      <form className="h-14 flex flex-row w-full gap-2 items-center mb-3">
        <input
          type="text"
          placeholder="Search Jobs by Title..."
          // name="search-query"
          // className="h-full flex-1 px-4 text-md border border-gray-300 rounded"
          className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-400 shadow-sm rounded-lg"
        />
        <button
          // type="submit"
          className={`w-[20%] bg-indigo-600 active:bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600  px-4 py-2 text-white font-medium   rounded-lg duration-150`}
        >
          Search
        </button>
      </form>
      <div className="text-white mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.length ? (
          jobs.map((job) => (
            <div
              key={"job"+job.id}
              className=" rounded-lg bg-gray-800 hover:bg-gray-700 p-6 space-y-4 shadow-md flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                {/* <div className="flex items-center gap-2">
                  <HeartIcon
                    className={`w-6 h-6 cursor-pointer ${
                      job.saved ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                </div> */}
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <img
                    src={job.company.logo_url}
                    alt={job.company.name}
                    className="h-10 rounded"
                  />
                  <span className="">{job.company.name}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPinIcon className="w-5 h-5 mr-1" />
                  <span>{job.location}</span>
                </div>
              </div>
              {/* <hr /> */}
              <p className="my-4 line-clamp-2">{job.description}</p>
              <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                More Details
              </button>
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
