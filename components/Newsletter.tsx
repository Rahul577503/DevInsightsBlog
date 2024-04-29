import React from "react";

const Newsletter = () => {
  return (
    <div className="bg-blue-100 rounded-md  p-6 shadow-blue-300 shadow-sm">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 my-4 ">Stay up to date with my content.</h1>

          <p className="font-md text-gray-900">
            Follow me on Twitter and sign up to the newsletter to get exclusive
            access to videos, articles and courses.
          </p>
          <p className="font-md text-gray-900">
            Worry not — {"I'll"} only use your email to send you programming
            content and you can unsubscribe at any time.
          </p>
        </div>
        <div className="flex gap-4 py-4 ">
          <input
            type="text"
            placeholder="Enter your mail"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500  placeholder-gray-400 placeholder-opacity-75"
          />

         <button className="border-none bg-blue-900 p-2 rounded-md text-white">SUBSCRIBE</button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
