const startup = {
  name: "Innovative Tech Solutions",
  tagline: "Building the future of AI-driven software.",
  description:
    "Innovative Tech Solutions is a leading software startup focused on providing cutting-edge artificial intelligence solutions to enterprises. Founded by alumni from the Class of 2015, we aim to revolutionize the way businesses harness AI for productivity and growth.",
  founded: "2021",
  location: "San Francisco, USA",
  alumni: "John Doe, Class of 2015",
  team: [
    {
      name: "John Doe",
      position: "CEO",
      image: "https://randomuser.me/api/portraits/women/79.jpg",
    },
    {
      name: "Jane Smith",
      position: "CTO",
      image: "https://randomuser.me/api/portraits/men/79.jpg",
    },
  ],
  offerings: [
    "AI-driven Software Solutions",
    "Data Analytics",
    "Machine Learning Consulting",
  ],
  opportunities: "Hiring Software Developers, Seeking Series A Investment",
  social: {
    website: "https://innovatetech.com",
    linkedin: "https://linkedin.com/company/innovatetech",
    twitter: "https://twitter.com/innovatetech",
  },
};

export default function StartupProfilePage() {
  return (
    <div className="bg-gray-900 text-gray-200 p-8">
      <div className="">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{startup.name}</h1>
          <p className="text-xl text-gray-400 mt-2">{startup.tagline}</p>
        </div>
        {/* Main Content */}
        <div className="space-y-8">
          {/* Description Section */}
          <section>
            <h2 className="text-2xl font-semibold">About Us</h2>
            <p className="mt-4">{startup.description}</p>
          </section>

          {/* Founders/Alumni Section */}
          <section>
            <h2 className="text-2xl font-semibold">Founder(s)</h2>
            <p className="mt-4">{startup.alumni}</p>
          </section>

          {/* Offerings Section */}
          <section>
            <h2 className="text-2xl font-semibold">What We Offer</h2>
            <ul className="list-disc list-inside mt-4 space-y-2">
              {startup.offerings.map((offering, index) => (
                <li key={index}>{offering}</li>
              ))}
            </ul>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="text-2xl font-semibold">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {startup.team.map((member, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-gray-400">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Opportunities Section */}
          <section>
            <h2 className="text-2xl font-semibold">Opportunities</h2>
            <p className="mt-4">{startup.opportunities}</p>
          </section>

          {/* Location Section */}
          <section>
            <h2 className="text-2xl font-semibold">Location</h2>
            <p className="mt-4">{startup.location}</p>
          </section>

          {/* Social and Contact Section */}
          <section>
            <h2 className="text-2xl font-semibold">Connect With Us</h2>
            <ul className="mt-4 space-y-2">
              <li>
                Website:{" "}
                <a
                  href={startup.social.website}
                  className="text-blue-500 hover:underline"
                >
                  {startup.social.website}
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a
                  href={startup.social.linkedin}
                  className="text-blue-500 hover:underline"
                >
                  {startup.social.linkedin}
                </a>
              </li>
              <li>
                Twitter:{" "}
                <a
                  href={startup.social.twitter}
                  className="text-blue-500 hover:underline"
                >
                  {startup.social.twitter}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
