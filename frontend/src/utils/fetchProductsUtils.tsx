import axios from "axios";
import { RakutenProduct } from "../Type";
import { RakutenAPI } from "../APIKeys";

export const fetchProducts = async ({
  setProducts,
  setLoading,
  keyword,
}: {
  setProducts: React.Dispatch<React.SetStateAction<RakutenProduct[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  keyword: string;
}) => {
  setLoading(true);

  try {
    const response = await axios.get(
      "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706",
      {
        params: {
          applicationId: RakutenAPI,
          keyword: keyword,
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
