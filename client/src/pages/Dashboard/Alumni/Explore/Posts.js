import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  HandThumbUpIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../../redux/alerts";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState(null);

  const fetchData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/alumni/posts`,
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
        setPosts(
          response.data.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } else {
        toast.error("Something went wrong!");
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 max-h-screen p-8 pt-0 text-white">
      {posts?.length > 0 ? (
        <>
          <div className="space-y-6 pt-2">
            <div className="justify-self-end">
              <Link
                to="/dashboard/create-post"
                className=" bg-blue-500 text-white h-full px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Create Post
              </Link>
            </div>
            {posts.map((post) => (
              <Post
                key={post.id}
                user={post.user}
                content={post.content}
                image={post.image}
                timestamp={post.timestamp}
                likes={post.likes}
                comments={post.comments}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-center text-xl my-4">No posts found</p>
          <Link
            className="text-center hover:underline"
            to="/dashboard/create-post"
          >
            <p>create post</p>
          </Link>
        </>
      )}
    </div>
  );
};

const Post = ({ user, content, image, timestamp, likes, comments }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-4 mx-2 my-4 flex flex-col md:flex-row md:space-x-4">
      {/* Left Side: Post Content */}
      <div className="flex-1 flex flex-col justify-between">
        {/* User Information and Content */}
        <div>
          <Link to={`/dashboard/profile/${user.id}`}>
            <div className="flex items-center mb-4">
              <img
                src={user.profilePicture || "/images/defppic.jpg"}
                alt={`${user.name}'s profile`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-400 text-sm">{user.headline}</p>
                <p className="text-gray-500 text-xs">
                  {moment(timestamp).fromNow()}
                </p>
              </div>
            </div>
          </Link>

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-sm">{content}</p>
          </div>

          {/* Post Image (if any) */}
          {image && (
            <div className="mb-4">
              <img
                src={image}
                alt="Post content"
                className="rounded-lg w-full max-h-40 object-cover"
              />
            </div>
          )}
        </div>

        {/* Reaction Buttons */}
        <div className="mt-auto border-t border-gray-700 pt-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400">
                <HandThumbUpIcon className="h-5 w-5" />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400">
                <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                <span>Comment</span>
              </button>
            </div>
            <div>
              <span className="text-gray-500 text-sm">
                {likes} Likes • {comments} Comments
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Comments Section */}
      <div
        className="md:w-1/3 w-full mt-4 md:mt-0 bg-gray-700 rounded-lg p-4 flex flex-col"
        style={{ maxHeight: "100%" }}
      >
        <div
          className="flex-1 overflow-y-auto"
          style={{ maxHeight: "inherit" }}
        >
          <h4 className="text-sm font-semibold mb-2">Comments</h4>
          <div className="text-gray-300 text-xs space-y-2">
            <p>
              <span className="font-bold">John Doe:</span> Congratulations on
              the new role!
            </p>
            <p>
              <span className="font-bold">Jane Smith:</span> Exciting news, good
              luck!
            </p>
            <p>
              <span className="font-bold">Alice Johnson:</span> Great to hear
              about the new position!
            </p>
            <p>
              <span className="font-bold">Michael Brown:</span> Keep up the
              awesome work!
            </p>
            <p>
              <span className="font-bold">Sarah Wilson:</span> Very inspiring!
            </p>
          </div>
        </div>

        {/* Add a Comment Input */}
        <input
          type="text"
          placeholder="Add a comment..."
          className="mt-2 w-full p-2 bg-gray-600 text-sm rounded-md outline-none focus:bg-gray-500"
        />
      </div>
    </div>
  );
};

export default Posts;
