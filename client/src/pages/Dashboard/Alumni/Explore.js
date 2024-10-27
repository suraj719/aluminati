import React from "react";
import moment from "moment";
import {
  HandThumbUpIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

// Static data for posts
const posts = [
  {
    id: 1,
    user: {
      name: "John Doe",
      headline: "Software Engineer at Tech Co.",
      profilePicture: "https://via.placeholder.com/150",
    },
    content:
      "Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!Excited to share that I've started a new role at Tech Co.!",
    image: "https://via.placeholder.com/600",
    timestamp: "2024-10-26T14:30:00Z",
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      headline: "Product Manager at Startup Inc.",
      profilePicture: "https://via.placeholder.com/150",
    },
    content:
      "Just wrapped up a great meeting with the team. Exciting times ahead!",
    image: "",
    timestamp: "2023-10-24T10:15:00Z",
    likes: 8,
    comments: 3,
  },
  {
    id: 3,
    user: {
      name: "Alice Johnson",
      headline: "Freelance Graphic Designer",
      profilePicture: "https://via.placeholder.com/150",
    },
    content:
      "Here's a sneak peek of a project I've been working on. Stay tuned!",
    image: "https://via.placeholder.com/600",
    timestamp: "2023-10-23T09:00:00Z",
    likes: 20,
    comments: 10,
  },
];

const Explore = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-8 pt-0 text-white">
      <div className="space-y-6 -my-4">
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
          <div className="flex items-center mb-4">
            <img
              src={user.profilePicture}
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

export default Explore;
