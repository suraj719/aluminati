import React from "react";

function Loader() {
  return (
    <div className="spinner-parent">
      <div className="spinner">
        <div className="flex space-x-2 justify-center items-center bg-white dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-6 w-6 bg-black rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
