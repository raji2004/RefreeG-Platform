import React from "react";

const Community: React.FC = () => {
  return (
    <div className="w-full px-4 py-6 md:px-8 lg:px-16">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">
        Join the Refreeg Community: Grow, Give, and Make a Difference Together
      </h2>
      <p className="text-sm md:text-base text-center mb-6">
        At Refreeg, we believe that true change happens when communities come
        together with a shared purpose. By joining our community, you become
        part of a dynamic and passionate group of individuals who are committed
        to empowering underprivileged communities across Africa.
      </p>

      <div className="flex justify-center">
        <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Join community
        </button>
      </div>

      <div className="mt-8">
        <button className="w-full flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow hover:shadow-md">
          <span>Why Join Us?</span>
          <span className="text-gray-500">{">"}</span>
        </button>
      </div>
    </div>
  );
};

export default Community;
