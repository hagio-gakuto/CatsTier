import Cookies from "js-cookie";
import { showToast } from "./toastifyUtils";
import { getMessage } from "./messageUtils";
import axios from "axios";
// import { Pet } from "../Type";

export let UserPets = [];

export const fetchUserPets = async ({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) => {
  setLoading(true);
  const breedsApi = "api/pet/user"; // ペットデータ取得APIのURL
  console.log("fetchUserPets");
  try {
    const data = {
      uid: Cookies.get("uid"), // ユーザーIDを取得
    };

    // ペットデータを取得
    const response = await axios.post(breedsApi, data);

    if (response.data) {
      // // クッキーから既存のペットデータを取得
      // const storagePets = Cookies.get("userPets")
      //   ? JSON.parse(Cookies.get("userPets") as string)
      //   : null;

      // if (storagePets && storagePets.length === 0) {
      //   // 取得したペットデータのactive属性をいったんfalseにする
      //   const newPets = response.data.map((pet: Pet) => {
      //     // pet.activeをfalseに初期化
      //     pet.active = false;

      //     // クッキーから保存されているactive属性を引き継ぐ
      //     const existingPet = storagePets.find((p: Pet) => p.id === pet.id);

      //     // 既存のペットがあれば、active属性を引き継ぐ
      //     if (existingPet && existingPet.active !== undefined) {
      //       pet.active = existingPet.active;
      //     }

      //     return pet;
      //   });

      //   // 新しいペットデータをクッキーに保存
      //   // console.log(newPets);
      //   Cookies.set("userPets", JSON.stringify(newPets));
      // } else {
      //   // console.log("bbb");
      //   // console.log(response.data);
      //   // クッキーに保存されたペットデータがなければ、response.dataをそのまま保存
      //   // 取得したデータのactive属性はfalseに設定される
      //   Cookies.set("userPets", JSON.stringify(response.data));
      // }
      UserPets = response.data;
      console.log(response.data);
      Cookies.set("userPets", JSON.stringify(response.data));
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    showToast("error", getMessage("BE0007")); // エラーハンドリング
    console.error(error);
  }
};
