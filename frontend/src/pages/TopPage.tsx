import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { showToast } from "../utils/toastifyUtils";
import Cookies from "js-cookie";
import IntroductionPopup from "../components/IntroductionPopup";
import axios from "axios";
// import Product from "../components/Product";
// import { Slider } from "@mui/material";

const TopPage: React.FC = () => {
  const [showPopup, setShowPopup] = React.useState(
    Cookies.get("isNewUser") !== "false" || false
  );
  const [products, setProducts] = React.useState<[]>([]);
  // console.log(Cookies.get("isNewUser"));
  // console.log(showPopup);
  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      // setLoading(true);
      // setError(null);  // エラーメッセージをリセット

      try {
        const response = await axios.get(
          "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706",
          {
            params: {
              applicationId: "1009937209585955269", // 取得したアプリIDを指定
              keyword: "cat", // 検索する商品名
              hits: 10, // 取得する商品の数
            },
          }
        );
        console.log(response);
        setProducts(response.data.Items); // 商品情報をstateに保存
      } catch (err) {
        console.error("Error during fetching products:", err);
        // setError("商品情報の取得に失敗しました");
      } finally {
        // setLoading(false);
      }
    };

    fetchProducts();
  }, []);
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
