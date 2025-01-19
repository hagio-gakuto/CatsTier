import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { showToast } from "../utils/toastifyUtils";
import Cookies from "js-cookie";

const TopPage: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await Cookies.remove("authToken");
      showToast("success", "ログアウトしました！");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-2xl font-bold">Welcome to Top Page</h1>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default TopPage;
