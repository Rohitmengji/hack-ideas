// src/Login.js
import React from "react";

const Login = ({ empId, setEmpId, handleLogin }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <main className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md mx-4 bg-white dark:bg-gray-800 shadow-md p-6 rounded-md">
          <h2 className="text-2xl text-center font-bold mb-4">
            Employee Login
          </h2>
          <p className="text-center mb-8">
            Please enter your Employee ID to continue.
          </p>

          <div className="space-y-4 mt-12">
            <div className="space-y-2">
              <label
                htmlFor="employee-id"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Employee ID
              </label>
              <input
                id="employee-id"
                placeholder="Enter your employee ID"
                required
                type="text"
                value={empId}
                onKeyDown={handleKeyPress}
                onChange={(e) => setEmpId(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          <div className="mt-12">
            <button
              onClick={handleLogin}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black-800 focus:outline-none focus:ring focus:border-black-300"
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
