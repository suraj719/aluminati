import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const CreateNews = () => {
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    headline: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/college/create-news`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("admin-token")}`,
          },
        }
      );

      setIsLoading(false);

      if (response.data.success) {
        toast.success("News Created Successfully!");
        setFormData({ headline: "", content: "" });
      } else {
        toast.error("Failed to create news");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong! Please try again.");
      console.error("Error creating news:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 pt-0">
      <h2 className="text-white text-2xl mb-6">Create News</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="headline"
          >
            Headline
          </label>
          <input
            id="headline"
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className={`px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
          disabled={loading}
        >
          {loading ? "Creating news..." : "Create news"}
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
