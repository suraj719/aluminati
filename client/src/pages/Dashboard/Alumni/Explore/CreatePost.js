import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const navigate = useNavigate();
  const { alumni } = useSelector((state) => state.alumni);
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    headline: "",
    content: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", alumni?.firstName + " " + alumni?.lastName);
      data.append("createdBy", alumni?._id);
      data.append("headline", formData.headline);
      data.append("profilePicture", alumni?.profilePicture || "");
      data.append("content", formData.content);
      if (formData.image) {
        data.append("image", formData.image);
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/alumni/create-post`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1]
            }`,
          },
        }
      );

      setIsLoading(false);

      if (response.data.success) {
        toast.success("Post Created Successfully!");
        navigate("/dashboard/explore");
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong! Please try again.");
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-8 pt-0">
      <Link
        to="/dashboard/explore"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Posts
      </Link>
      <h2 className="text-white text-2xl mb-6">Create Post</h2>
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
        <div className="mb-4">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="image"
          >
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageUpload}
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
          {loading ? "Creating Post..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
