import { axiosFunction } from "./axiosUtil";
import Cookies from "js-cookie";

export const fetchUserPets = async <T,>({
  setUserPets,
}: {
  setUserPets: React.Dispatch<React.SetStateAction<T>>; // setResultはジェネリック型Tを受け取る
}) => {
  console.log("fetchUserPets");
  const breedsApi = "api/pet/user";
  axiosFunction({
    api: breedsApi,
    data: { uid: Cookies.get("uid") },
    setResult: setUserPets,
  });
};
