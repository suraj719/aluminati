import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-[90%] my-14 md:my-0 flex items-center justify-center">
        <section className="mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
          <div className="space-y-4 flex-1 sm:text-center lg:text-left">
            <h1 className="text-white font-bold text-4xl xl:text-5xl">
              Empowering <span className="text-indigo-400">Alumni</span>,
              Connecting Futures
            </h1>
            <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
              Aluminati bridges alumni, current students, and the college,
              promoting collaboration and growth. Stay informed about events,
              mentorships, and opportunities within the community.
            </p>
            <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
              <Link
                href="/signup"
                className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto"
              >
                Get started
              </Link>
              <a
                href="#"
                className="px-7 py-3 w-full bg-gray-700 text-gray-200 text-center rounded-md block sm:w-auto"
              >
                Explore events
              </a>
            </div>
          </div>
          <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
            <img
              src="home.png"
              className="w-full mx-auto sm:w-10/12  lg:w-full"
            />
          </div>
        </section>
      </div>
    </>
  );
}
