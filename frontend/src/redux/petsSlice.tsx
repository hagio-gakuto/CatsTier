// petsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pet } from "../Type"; // Pet型の定義
import Cookies from "js-cookie";
import axios from "axios";

interface PetsState {
  pets: Pet[];
  loading: boolean;
}

const initialState: PetsState = {
  pets: [],
  loading: false,
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setPets(state, action: PayloadAction<Pet[]>) {
      state.pets = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    changeActivePet(state, action: PayloadAction<number>) {
      const petId = action.payload;
      state.pets.forEach((pet) => {
        pet.active = pet.id === petId;
      });
    },
  },
});

// 非同期処理
import { AppDispatch } from "./store"; // Adjust the import path as necessary

export const fetchUserPets = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  const breedsApi = "api/pet/user"; // ペットデータ取得APIのURL

  try {
    const data = {
      uid: Cookies.get("uid"), // ユーザーIDを取得
    };

    const response = await axios.post(breedsApi, data);

    if (response.data) {
      dispatch(setPets(response.data)); // Reduxステートにデータをセット
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
    // ここにエラーハンドリングの処理を追加する
  } finally {
    dispatch(setLoading(false));
  }
};

// アクションのエクスポート
export const { setPets, setLoading, changeActivePet } = petsSlice.actions;

// Reducerのエクスポート
export default petsSlice.reducer;
