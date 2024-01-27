import React from "react";

const UserLogout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    onLogout();
    console.log("Logout successful");
  };

  return (
    <div>
      <p>Welcome, {localStorage.getItem("userEmail")}!</p>
      <button type="button" onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default UserLogout;
