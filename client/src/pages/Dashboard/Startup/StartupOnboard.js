import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function StartupOnboard() {
  const navigate = useNavigate();
  const { startup } = useSelector((state) => state?.startup);
  const teamMembersContainerRef = useRef(null);
  const foundersContainerRef = useRef(null);

  const [formData, setFormData] = useState({
    companyName: startup?.companyName || "",
    logo: null,
    email: startup?.email || "",
    description: "",
    location: "",
    socialMedia: {
      website: "",
      linkedIn: "",
      twitter: "",
    },
    founders: [{ name: "", passoutYear: "" }],
    teamMembers: [{ name: "", position: "" }],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSocialMediaChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      socialMedia: { ...formData.socialMedia, [id]: value },
    });
  };

  const handleFileChange = (e) => {
    const { id } = e.target;
    setFormData({ ...formData, [id]: e.target.files[0] });
  };

  const handleDynamicFieldChange = (field, index, e) => {
    const { name, value } = e.target;
    const updatedField = formData[field].map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData({ ...formData, [field]: updatedField });
  };

  const addDynamicField = (field, template) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], template],
    });
    setTimeout(() => {
      const ref =
        field === "teamMembers"
          ? teamMembersContainerRef
          : foundersContainerRef;
      if (ref.current) {
        ref.current.scrollTo({
          top: ref.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dform = new FormData();
    dform.append("onboardingStatus", true);
    dform.append("companyName", formData.companyName);
    if (formData.logo) dform.append("logo", formData.logo);
    dform.append("email", formData.email);
    dform.append("description", formData.description);
    dform.append("location", formData.location);
    dform.append("socialMedia", JSON.stringify(formData.socialMedia));
    dform.append("founders", JSON.stringify(formData.founders));
    dform.append("team", JSON.stringify(formData.teamMembers));

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/startup/update-startup`,
        dform,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("startup-token")}`,
          },
        }
      );

      setIsLoading(false);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/startup/dashboard");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (!startup?.email) {
      toast.error("something went wrong!");
      navigate("/startup/login");
    }
    if (startup && startup.onboardingStatus) {
      navigate("/startup/dashboard");
    }
  }, []);

  return (
    <div className="h-[90%] pt-8 px-8">
      <form className="h-[85vh]" onSubmit={handleSubmit}>
        <div
          ref={teamMembersContainerRef}
          style={{
            height: "85%",
            overflow: "auto",
          }}
          className="scrollbar-custom bg-gray-800 text-white shadow-md rounded px-8 pt-6 mx-8 flex flex-col"
        >
          {/* Company Name */}
          <div className="mb-6">
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              required
            />
          </div>

          {/* Logo Upload */}
          <div className="mb-6">
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="logo"
            >
              Logo
            </label>
            <input
              className="block w-full text-white"
              id="logo"
              type="file"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
              id="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your startup"
              required
            ></textarea>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
              id="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Startup Location"
              required
            />
          </div>

          {/* Social Media */}
          <h2 className="text-lg font-bold mb-4">Social Media</h2>
          {["website", "linkedIn", "twitter"].map((platform) => (
            <div className="mb-6" key={platform}>
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor={platform}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </label>
              <input
                className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                id={platform}
                type="text"
                value={formData.socialMedia[platform]}
                onChange={handleSocialMediaChange}
                placeholder={`Enter your ${platform} handle`}
              />
            </div>
          ))}

          {/* Founders */}
          <h2 className="text-lg font-bold mb-4">Founders</h2>
          {formData.founders.map((founder, index) => (
            <div key={index} className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase text-xs font-bold mb-2"
                  htmlFor={`founder-name-${index}`}
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  name="name"
                  id={`founder-name-${index}`}
                  type="text"
                  value={founder.name}
                  onChange={(e) =>
                    handleDynamicFieldChange("founders", index, e)
                  }
                  placeholder="Founder Name"
                  required
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase text-xs font-bold mb-2"
                  htmlFor={`founder-passoutYear-${index}`}
                >
                  Passout Year
                </label>
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  name="passoutYear"
                  id={`founder-passoutYear-${index}`}
                  type="number"
                  value={founder.passoutYear}
                  onChange={(e) =>
                    handleDynamicFieldChange("founders", index, e)
                  }
                  placeholder="Passout Year"
                  required
                />
              </div>
            </div>
          ))}

          {/* Add Founder Button */}
          <button
            type="button"
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() =>
              addDynamicField("founders", { name: "", passoutYear: "" })
            }
          >
            Add Founder
          </button>

          {/* Team Members */}
          <h2 className="text-lg font-bold mb-4">Team Members</h2>
          {formData.teamMembers.map((member, index) => (
            <div key={index} className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase text-xs font-bold mb-2"
                  htmlFor={`teamMember-name-${index}`}
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  name="name"
                  id={`teamMember-name-${index}`}
                  type="text"
                  value={member.name}
                  onChange={(e) =>
                    handleDynamicFieldChange("teamMembers", index, e)
                  }
                  placeholder="Team Member Name"
                  required
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase text-xs font-bold mb-2"
                  htmlFor={`teamMember-position-${index}`}
                >
                  Position
                </label>
                <input
                  className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
                  name="position"
                  id={`teamMember-position-${index}`}
                  type="text"
                  value={member.position}
                  onChange={(e) =>
                    handleDynamicFieldChange("teamMembers", index, e)
                  }
                  placeholder="Team Member Position"
                  required
                />
              </div>
            </div>
          ))}

          {/* Add Team Member Button */}
          <button
            type="button"
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              addDynamicField("teamMembers", { name: "", position: "" })
            }
          >
            Add Team Member
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-6 mx-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 w-full hover:bg-blue-500 text-white font-bold py-2 px-4 rounded h-12 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
