import React from "react";

export default function ErrorPage() {
  return (
    <div className="w-[100vw] h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg text-gray-200">
          Oops! Looks like you're lost !!
        </p>
        <p className="mt-4 text-2xl text-gray-100">
          Let's get you back{" "}
          <a href="/" className="text-blue-500">
            home
          </a>
        </p>
      </div>
    </div>
  );
}
