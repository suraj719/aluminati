import Link from "next/link";

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

const page = () => {
  return (
    <div className=" bg-gray-900 text-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const EventCard = ({ event }: any) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
      <img
        src={event.image}
        alt={event.title}
        className="rounded-lg w-full h-40 object-cover"
      />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <p className="text-gray-400">
          {event.date} - {event.location}
        </p>
        <p>{event.description}</p>
        <Link href={`/events/${event.slug}`}>
          <p className="text-blue-500 hover:underline">Learn More</p>
        </Link>
      </div>
    </div>
  );
};

export default page;
