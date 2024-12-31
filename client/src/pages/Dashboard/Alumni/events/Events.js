import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../../../redux/alerts";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const tempevents = [
  {
    id: 1,
    title: "Alumni Meet 2024",
    description:
      "Reconnect with fellow alumni and share your experiences at our annual alumni meet.Reconnect with fellow alumni and share your experiences at our annual alumni meet.",
    date: "2024-10-15",
    location: "Texas park, United States",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
  },
  {
    id: 2,
    title: "Web Development Workshop",
    description:
      "A hands-on workshop focusing on the latest web development trends and technologies.",
    date: "2024-11-05",
    location: "Online",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
    slug: "web-dev-workshop",
  },
  {
    id: 3,
    title: "Alumni Mentorship Program",
    description:
      "Join the mentorship program to guide and support current students in their career paths.",
    date: "2024-09-25",
    location: "CVRCOE, Hyderabad",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    slug: "mentorship-program",
  },
  {
    id: 3,
    title: "Alumni Mentorship Program",
    description:
      "Join the mentorship program to guide and support current students in their career paths.",
    date: "2024-09-25",
    location: "CVRCOE, Hyderabad",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    slug: "mentorship-program",
  },
  {
    id: 3,
    title: "Alumni Mentorship Program",
    description:
      "Join the mentorship program to guide and support current students in their career paths.",
    date: "2024-09-25",
    location: "CVRCOE, Hyderabad",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    slug: "mentorship-program",
  },
  {
    id: 3,
    title: "Alumni Mentorship Program",
    description:
      "Join the mentorship program to guide and support current students in their career paths.",
    date: "2024-09-25",
    location: "CVRCOE, Hyderabad",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    slug: "mentorship-program",
  },
];

export default function Events() {
  const navigate = useNavigate();
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
        setEvents(response.data.events);
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
        <button
          onClick={() => navigate("/dashboard/create-event")}
          className="bg-blue-500 text-white h-full px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Event
        </button>
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
        src={event.image}
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
