"use client";
import React, { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phoneNumber: "",
    graduationYear: "",
    degree: "",
    major: "",
    currentJobTitle: "",
    currentCompany: "",
    yearsOfExperience: "",
    previousJobTitle: "",
    previousCompany: "",
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

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
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="previousJobTitle"
          >
            Previous Job Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="previousJobTitle"
            type="text"
            value={formData.previousJobTitle}
            onChange={handleChange}
            placeholder="Previous Job Title"
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="previousCompany"
          >
            Previous Company
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            id="previousCompany"
            type="text"
            value={formData.previousCompany}
            onChange={handleChange}
            placeholder="Previous Company"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default page;
