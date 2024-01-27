import UserLogin from "./Components/User/UserLogin";
import UserRegister from "./Components/User/UserRegister";
import ProductHome from "./Components/Product/ProductHome";
import UserLogout from "./Components/User/UserLogout";
import { useState } from "react";
import AdminLogin from "./Components/Admin/AdminLogin";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const userAccessToken = localStorage.getItem("accessToken");
  const adminAccessToken = localStorage.getItem("adminAccessToken");

  const handleLogin = (email) => {
    setUserEmail(email);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleLogout = () => {
    setUserEmail("");
    setIsAdmin(false);
  };

  return (
    <div className="App">
      {!userAccessToken && !adminAccessToken && (
        <>
          <UserRegister />
          <hr />
          <UserLogin onLogin={handleLogin} />
        </>
      )}
      {userAccessToken && (
        <>
          <UserLogout onLogout={handleLogout} />
          <hr />
          <ProductHome />
        </>
      )}

      {!userAccessToken && !isAdmin && (
        <>
          <hr />
          <AdminLogin onAdminLogin={handleAdminLogin} />
        </>
      )}
      {isAdmin && (
        <>
          <hr />
          <h1>Welcome, Admin!</h1>
          <ProductHome />
        </>
      )}
    </div>
  );
}

export default App;
