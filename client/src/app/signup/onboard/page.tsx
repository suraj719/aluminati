"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    graduationYear: "",
    degree: "",
    major: "",
    currentJobTitle: "",
    currentCompany: "",
    yearsOfExperience: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
    resume: null,
    previousExperience: [
      { companyName: "", jobTitle: "", startYear: "", endYear: "" }, // Initial experience
    ],
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleExperienceChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const updatedExperiences = formData.previousExperience.map(
      (experience, i) =>
        i === index ? { ...experience, [name]: value } : experience
    );
    setFormData({ ...formData, previousExperience: updatedExperiences });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      previousExperience: [
        ...formData.previousExperience,
        { companyName: "", jobTitle: "", startYear: "", endYear: "" },
      ],
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/alumni/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    console.log(response);
  };

  const handleResumeUpload = (e: any) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
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
  useEffect(() => {
    getCurrentLocation();
  }, []);
  return (
    <form
      className="bg-gray-800 text-white shadow-md rounded px-8 pt-6 pb-8 m-8 flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>
      </div>

      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="graduationYear"
          >
            Graduation Year
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="graduationYear"
            type="number"
            value={formData.graduationYear}
            onChange={handleChange}
            placeholder="Graduation Year"
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="degree"
          >
            Degree
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="degree"
            type="text"
            value={formData.degree}
            onChange={handleChange}
            placeholder="Degree"
          />
        </div>
      </div>

      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="major"
          >
            Major
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="major"
            type="text"
            value={formData.major}
            onChange={handleChange}
            placeholder="Major"
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="currentJobTitle"
          >
            Current Job Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="currentJobTitle"
            type="text"
            value={formData.currentJobTitle}
            onChange={handleChange}
            placeholder="Current Job Title"
          />
        </div>
      </div>

      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="currentCompany"
          >
            Current Company
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="currentCompany"
            type="text"
            value={formData.currentCompany}
            onChange={handleChange}
            placeholder="Current Company"
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="yearsOfExperience"
          >
            Years of Experience
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="yearsOfExperience"
            type="number"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            placeholder="Years of Experience"
          />
        </div>
      </div>

      <div className="-mx-3 md:flex mb-6">
        <div className="relative md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="currentLocation"
          >
            Current Location
          </label>
          <div className="relative">
            <input
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 pr-12 mb-3 focus:outline-none focus:border-indigo-500"
              id="currentLocation"
              type="text"
              value={
                formData.location.latitude != 0
                  ? `${formData.location.latitude}, ${formData.location.longitude}`
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
        </div>

        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="resume"
          >
            Upload Resume
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="resume"
            type="file"
            onChange={handleResumeUpload}
          />
        </div>
      </div>

      {/* Previous Experience Section */}
      <h2 className="text-lg font-bold mb-4">Previous Experiences</h2>
      {formData.previousExperience.map((experience, index) => (
        <div key={index} className="-mx-3 md:flex mb-6">
          <div className="md:w-1/3 px-3">
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor={`companyName-${index}`}
            >
              Company Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
              name="companyName"
              id={`companyName-${index}`}
              type="text"
              value={experience.companyName}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Company Name"
            />
          </div>
          <div className="md:w-1/3 px-3">
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor={`jobTitle-${index}`}
            >
              Job Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
              name="jobTitle"
              id={`jobTitle-${index}`}
              type="text"
              value={experience.jobTitle}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Job Title"
            />
          </div>
          <div className="md:w-1/3 px-3">
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor={`startYear-${index}`}
            >
              Start Year
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
              name="startYear"
              id={`startYear-${index}`}
              type="number"
              value={experience.startYear}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Start Year"
            />
          </div>
          <div className="md:w-1/3 px-3">
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor={`endYear-${index}`}
            >
              End Year
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
              name="endYear"
              id={`endYear-${index}`}
              type="number"
              value={experience.endYear}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="End Year"
            />
          </div>
        </div>
      ))}

      <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <button
          type="button"
          className="bg-green-600 w-full md:w-1/2 hover:bg-green-500 text-white font-bold py-2 px-4 rounded h-12"
          onClick={addExperience}
        >
          Add Another Experience
        </button>
        <button
          type="submit"
          className="bg-blue-600 w-full md:w-1/2 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded h-12"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default page;
