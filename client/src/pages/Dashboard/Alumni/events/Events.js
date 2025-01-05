import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../../../redux/alerts";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

export default function Events() {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const fetchData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/alumni/events`,
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
        setEvents(
          response.data.events.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } else {
        toast.error("something went wrong!");
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      toast.error("something went wrong!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" bg-gray-900 text-gray-200 p-8 pt-0">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        <Link
          to="/dashboard/create-event"
          className="bg-blue-500 text-white h-full px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Event
        </Link>
      </div>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <li key={"event" + event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const EventCard = ({ event }) => {
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

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 hover:bg-gray-700 h-[23rem]">
      <img
        src={event?.image || "/images/defeventpic.jpg"}
        alt={event.title}
        className="rounded-lg w-full h-40 object-cover"
      />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <p className="text-gray-400 line-clamp-1">
          {formatDate(event.date)} - {event.location}
        </p>
        <p className="line-clamp-2">{event.description}</p>
        <Link to={`/dashboard/event/${event._id}`}>
          <p className="text-blue-500 hover:underline">View more details..</p>
        </Link>
      </div>
    </div>
  );
};
