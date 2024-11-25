import React from "react";

function Dashboard() {
  return (
    <div className="flex items-center justify-center h-full text-white bg-gradient-to-r from-green-400 to-blue-500">
      <div className="space-y-6 text-center">
        {/* Main Heading */}
        <h1 className="text-5xl font-semibold text-gray-900">
          Welcome to Your Dashboard!
        </h1>
        
        {/* Subheading */}
        <p className="text-xl font-medium text-gray-200">
          Manage your tasks and track everything in one place with ease.
        </p>
        
       
      </div>
    </div>
  );
}

export default Dashboard;
