import { useParams, Link } from "react-router-dom";
import { ClipboardDocumentIcon, ShareIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/alerts";
import SideBar from "./SideBar";

export default function CollegeEventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/college/event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("admin-token="))
                ?.split("=")[1]
            }`,
          },
        }
      );
      if (response.data.success) {
        setEvent(response.data.event);
      } else {
        // toast.error("Something went wrong!");
      }
    } catch (error) {
      dispatch(HideLoading());
      // toast.error("Something went wrong!");
    }
    dispatch(HideLoading());
  };

  useEffect(() => {
    fetchData();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  if (!event) {
    return (
      <div className="bg-gray-900 text-gray-200 p-8">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <p className="mt-4">The event you're looking for does not exist.</p>
        <Link
          to="/dashboard/events"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full max-h-[90vh] overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div className="w-full m-4 mb-0">
          <div
            className="bg-gray-900 text-gray-200 p-8 pt-0   overflow-hidden scrollbar-custom"
            style={{
              height: "90%",
              overflow: "auto",
            }}
          >
            <div className="w-full">
              <Link
                to="/college/events"
                className="text-blue-500 hover:underline mb-4 inline-block"
              >
                &larr; Back to Events
              </Link>

              <div className="bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
                <img
                  src={event.image || "/images/defeventpic.jpg"}
                  alt={event.title}
                  className="rounded-lg w-full h-96 object-cover"
                />
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <h1 className="text-4xl font-bold">{event.title}</h1>
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          navigator.share({
                            title: event.title,
                            text: event.description,
                            url: window.location.href,
                          })
                        }
                        className="flex items-center gap-2 bg-green-700 text-white px-3 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                      >
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
                    {formatDate(event?.date)} - {event.location}
                  </p>
                  <p className="leading-relaxed text-lg">{event.description}</p>
                </div>
                {event.registeredAlumni?.length > 0 && (
                  <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-600">
                      Registered Alumni
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-gray-800 text-left text-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-700 text-gray-300">
                          <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Phone Number</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                          {event.registeredAlumni.map((alumni) => (
                            <tr key={alumni._id} className="hover:bg-gray-700">
                              <td className="px-6 py-4">
                                {alumni.firstName} {alumni.lastName}
                              </td>
                              <td className="px-6 py-4">{alumni.email}</td>
                              <td className="px-6 py-4">
                                {alumni.phoneNumber}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
