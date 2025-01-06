import React from "react";
import { Link } from "react-router-dom";

function LoginSelection() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Login as</h1>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to="/login/vi"
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg"
        >
          Visually Impaired (VI)
        </Link>
        <Link
          to="/login/guard"
          className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg"
        >
          Guard
        </Link>
      </div>
    </div>
  );
}

export default LoginSelection;
