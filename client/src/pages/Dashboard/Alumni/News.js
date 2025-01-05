import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/alerts";

export default function News() {
  const [newsItems, setNewsItems] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNews = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/college/news`,
          {
            headers: {
              Authorization: `Bearer ${
                document.cookie
                  .split("; ")
                  .find((row) => row.startsWith("token="))
                  ?.split("=")[1]
              }`,
            },
          }
        );
        if (response.data.success) {
          setNewsItems(
            response.data.news.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          );
        } else {
          // toast.error("Failed to fetch news.");
        }
        dispatch(HideLoading());
      } catch (error) {
        console.error("Error fetching news:", error);
        toast.error("Something went wrong! Please try reloading the page.");
      } finally {
        dispatch(HideLoading());
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-8 pt-0 bg-gray-900 text-white max-h-screen">
      <h1 className="text-3xl font-bold mb-6">News</h1>
      {newsItems?.length > 0 ? (
        <div className="space-y-6">
          {newsItems?.map((item, index) => (
            <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">{item.headline}</h2>
              <p className="text-gray-400 mb-4">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
}
