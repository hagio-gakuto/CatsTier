import axios from "axios";
import { RakutenProduct } from "../Type";

export const fetchProducts = async ({
  setProducts,
  setLoading,
}: {
  setProducts: React.Dispatch<React.SetStateAction<RakutenProduct[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setLoading(true);

  try {
    const response = await axios.get(
      "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706",
      {
        params: {
          applicationId: "1009937209585955269",
          keyword: "cat",
          hits: 10,
        },
      }
    );
    setProducts(response.data.Items);
  } catch (err) {
    console.error("Error during fetching products:", err);
  } finally {
    setLoading(false);
  }
};
