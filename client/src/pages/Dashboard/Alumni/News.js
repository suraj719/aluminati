import React from "react";

const newsItems = [
  {
    title: "Alumni Meet 2023",
    date: "March 15, 2023",
    description: "Join us for the annual alumni meet and reconnect with your batchmates."
  },
  {
    title: "College Fest 2023",
    date: "April 10, 2023",
    description: "Don't miss the college fest with exciting events, competitions, and performances."
  },
  {
    title: "New Research Lab Inauguration",
    date: "May 5, 2023",
    description: "Our new state-of-the-art research lab is now open for students and faculty."
  }
];

export default function News() {
  return (
    <div className="p-8 pt-0 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">News</h1>
      <div className="space-y-6">
        {newsItems.map((item, index) => (
          <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-400 mb-4">{item.date}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}