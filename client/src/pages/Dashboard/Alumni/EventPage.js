import { useParams, Link } from "react-router-dom";
import {
  ClipboardDocumentIcon,
  ShareIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

const events = [
  {
    id: 1,
    title: "Alumni Meet 2024",
    description:
      "Reconnect with fellow alumni and share your experiences at our annual alumni meet.",
    date: "2024-10-15",
    location: "Texas park, United States",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
    slug: "alumni-meet-2024",
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
];

export default function EventDetails() {
  const { eventId } = useParams();
  const event = events.find((event) => event.id === parseInt(eventId));

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
    <div className="bg-gray-900 text-gray-200 p-8 pt-0 min-h-screen">
      <div className="w-full">
        <Link
          to="/dashboard/events"
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
          &larr; Back to Events
        </Link>

        <div className="bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          <img
            src={event.image}
            alt={event.title}
            className="rounded-lg w-full h-96 object-cover"
          />

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold">{event.title}</h1>

              {/* Buttons Positioned Near Title */}
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-blue-700 text-white px-3 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                  <UserPlusIcon className="h-5 w-5" />
                  Register
                </button>
                <button className="flex items-center gap-2 bg-green-700 text-white px-3 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200">
                  <ShareIcon className="h-5 w-5" />
                  Share
                </button>
                <button className="flex items-center gap-2 bg-gray-700 text-white px-3 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-200">
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  Copy Link
                </button>
              </div>
            </div>

            <p className="text-gray-400">
              {event.date} - {event.location}
            </p>
            <p className="leading-relaxed text-lg">{event.description}</p>
          </div>

          <div className="pt-8 border-t border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>
                <strong>Date:</strong> {event.date}
              </li>
              <li>
                <strong>Location:</strong> {event.location}
              </li>
              <li>
                <strong>Description:</strong> {event.description}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
