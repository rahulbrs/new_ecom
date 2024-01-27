import { useState } from "react";

const AdminLogin = ({ onAdminLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminAccessToken", data.accessToken);
        onAdminLogin();
        console.log("Admin login successful");
      } else {
        const errorData = await response.json();
        console.error(`Admin login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("An error occurred during admin login", error);
    }
  };

  return (
    <>
      <form className="container">
        <h1>Admin Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="button" onClick={submitLogin} className="btn btn-primary">
          Admin Login
        </button>
      </form>
    </>
  );
};

export default AdminLogin;
