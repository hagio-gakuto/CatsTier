import axios from "axios";

export const fetchProducts = async ({
  setProducts,
  setLoading,
}: {
  setProducts: React.Dispatch<React.SetStateAction<[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setLoading(true);
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
    setProducts(response.data.Items); // 商品情報をstateに保存
  } catch (err) {
    console.error("Error during fetching products:", err);
    // setError("商品情報の取得に失敗しました");
  } finally {
    setLoading(false);
  }
};
