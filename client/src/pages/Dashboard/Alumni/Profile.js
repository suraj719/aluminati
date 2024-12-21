import React, { useState } from "react";

const initialProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNumber: "123-456-7890",
  graduationYear: 2010,
  degree: "B.Sc. Computer Science",
  major: "Computer Science",
  currentJobTitle: "Software Engineer",
  currentCompany: "Tech Corp",
  yearsOfExperience: 5,
  location: {
    latitude: 0,
    longitude: 0,
  },
  profilePhoto: null,
  resume: null,
  previousExperience: [
    {
      companyName: "Previous Company",
      jobTitle: "Junior Developer",
      startYear: 2015,
      endYear: 2018,
    },
  ],
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProfile({ ...profile, [name]: files[0] });
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      previousExperience: [
        ...profile.previousExperience,
        {
          companyName: "",
          jobTitle: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setProfile({
            ...profile,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  return (
    <div className="p-8 pt-0 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="space-y-6">
        <div className="flex space-x-4">
          <button
            onClick={toggleEdit}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            // onClick={shareProfile}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Share Profile
          </button>
          <button
            // onClick={deleteProfile}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
          >
            Delete Profile
          </button>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
          <div className="mb-6">
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="profilePhoto"
            >
              Profile Photo
            </label>
            {isEditing ? (
              <input
                className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                id="profilePhoto"
                type="file"
                name="profilePhoto"
                onChange={handleFileChange}
              />
            ) : (
              profile.profilePhoto && (
                <img
                  src={URL.createObjectURL(profile.profilePhoto)}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mb-3"
                />
              )
            )}
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              {isEditing ? (
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              ) : (
                <p>{profile.firstName}</p>
              )}
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              {isEditing ? (
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              ) : (
                <p>{profile.lastName}</p>
              )}
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              {isEditing ? (
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  id="email"
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              {isEditing ? (
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              ) : (
                <p>{profile.phoneNumber}</p>
              )}
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="graduationYear"
              >
                Graduation Year
              </label>
              {isEditing ? (
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  id="graduationYear"
                  type="number"
                  name="graduationYear"
                  value={profile.graduationYear}
                  onChange={handleChange}
                  placeholder="Graduation Year"
                />
              ) : (
                <p>{profile.graduationYear}</p>
              )}
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="degree"
              >
                Degree
              </label>
              {isEditing ? (
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  id="degree"
                  type="text"
                  name="degree"
                  value={profile.degree}
                  onChange={handleChange}
                  placeholder="Degree"
                />
              ) : (
                <p>{profile.degree}</p>
              )}
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="major"
              >
                Major
              </label>
              {isEditing ? (
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  id="major"
                  type="text"
                  name="major"
                  value={profile.major}
                  onChange={handleChange}
                  placeholder="Major"
                />
              ) : (
                <p>{profile.major}</p>
              )}
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="currentJobTitle"
              >
                Current Job Title
              </label>
              {isEditing ? (
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  id="currentJobTitle"
                  type="text"
                  name="currentJobTitle"
                  value={profile.currentJobTitle}
                  onChange={handleChange}
                  placeholder="Current Job Title"
                />
              ) : (
                <p>{profile.currentJobTitle}</p>
              )}
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="currentCompany"
              >
                Current Company
              </label>
              {isEditing ? (
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  id="currentCompany"
                  type="text"
                  name="currentCompany"
                  value={profile.currentCompany}
                  onChange={handleChange}
                  placeholder="Current Company"
                />
              ) : (
                <p>{profile.currentCompany}</p>
              )}
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="yearsOfExperience"
              >
                Years of Experience
              </label>
              {isEditing ? (
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  id="yearsOfExperience"
                  type="number"
                  name="yearsOfExperience"
                  value={profile.yearsOfExperience}
                  onChange={handleChange}
                  placeholder="Years of Experience"
                />
              ) : (
                <p>{profile.yearsOfExperience}</p>
              )}
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              {isEditing ? (
                <div className="relative">
                  <input
                    className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 pr-12 mb-3 focus:outline-none focus:border-indigo-500"
                    id="currentLocation"
                    type="text"
                    value={
                      profile.location.latitude != 0
                        ? `${profile.location.latitude}, ${profile.location.longitude}`
                        : ""
                    }
                    onChange={handleChange}
                    placeholder="Current Location"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={getCurrentLocation}
                  >
                    <path d="M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm40-158q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-120q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm0-80Z" />
                  </svg>
                </div>
              ) : (
                <p>
                  {profile.location.latitude}, {profile.location.longitude}
                </p>
              )}
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="resume"
              >
                Resume
              </label>
              {isEditing ? (
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  id="resume"
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                />
              ) : (
                profile.resume && (
                  <a
                    href={URL.createObjectURL(profile.resume)}
                    download
                    className="text-blue-500"
                  >
                    Download Resume
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Previous Experience</h2>
            {profile.previousExperience.map((experience, index) => (
              <div key={index} className="mb-6">
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor={`companyName${index}`}
                    >
                      Company Name
                    </label>
                    {isEditing ? (
                      <input
                        className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                        id={`companyName${index}`}
                        type="text"
                        value={experience.companyName}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            previousExperience: profile.previousExperience.map(
                              (exp, i) =>
                                i === index
                                  ? { ...exp, companyName: e.target.value }
                                  : exp
                            ),
                          })
                        }
                        placeholder="Company Name"
                      />
                    ) : (
                      <p>{experience.companyName}</p>
                    )}
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor={`jobTitle${index}`}
                    >
                      Job Title
                    </label>
                    {isEditing ? (
                      <input
                        className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                        id={`jobTitle${index}`}
                        type="text"
                        value={experience.jobTitle}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            previousExperience: profile.previousExperience.map(
                              (exp, i) =>
                                i === index
                                  ? { ...exp, jobTitle: e.target.value }
                                  : exp
                            ),
                          })
                        }
                        placeholder="Job Title"
                      />
                    ) : (
                      <p>{experience.jobTitle}</p>
                    )}
                  </div>
                </div>
                <div className="-mx-3 md:flex">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor={`startYear${index}`}
                    >
                      Start Year
                    </label>
                    {isEditing ? (
                      <input
                        className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                        id={`startYear${index}`}
                        type="number"
                        value={experience.startYear}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            previousExperience: profile.previousExperience.map(
                              (exp, i) =>
                                i === index
                                  ? { ...exp, startYear: e.target.value }
                                  : exp
                            ),
                          })
                        }
                        placeholder="Start Year"
                      />
                    ) : (
                      <p>{experience.startYear}</p>
                    )}
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor={`endYear${index}`}
                    >
                      End Year
                    </label>
                    {isEditing ? (
                      <input
                        className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                        id={`endYear${index}`}
                        type="number"
                        value={experience.endYear}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            previousExperience: profile.previousExperience.map(
                              (exp, i) =>
                                i === index
                                  ? { ...exp, endYear: e.target.value }
                                  : exp
                            ),
                          })
                        }
                        placeholder="End Year"
                      />
                    ) : (
                      <p>{experience.endYear}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none"
              >
                Add Experience
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
