import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { showToast } from "../utils/toastifyUtils";
import Cookies from "js-cookie";
import IntroductionPopup from "../components/IntroductionPopup";

// import Product from "../components/Product";
// import { Slider } from "@mui/material";

const TopPage: React.FC = () => {
  const [showPopup, setShowPopup] = React.useState(
    Cookies.get("isNewUser") !== "false" || false
  );

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
    <div className="min-h-screen bg-green-100">
      {/* <Slider /> */}

      {/* <div className="flex flex-wrap justify-center">
        {products.map((product, index) => (
          <Product key={index} product={product} /> // ここでProductコンポーネントを呼び出している
        ))}
      </div> */}

      {showPopup && <IntroductionPopup setShowPopup={setShowPopup} />}
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
