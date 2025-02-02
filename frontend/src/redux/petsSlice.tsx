// petsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pet } from "../Type"; // Pet型の定義
import Cookies from "js-cookie";
import axios from "axios";

interface PetsState {
  pets: Pet[];
  loading: boolean;
  activePetId: number | null; // activeなペットのIDを保持
}

const initialState: PetsState = {
  pets: [],
  loading: false,
  activePetId: null, // 初期状態ではアクティブなペットは無し
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setPets(state, action: PayloadAction<Pet[]>) {
      state.pets = action.payload;
      if (action.payload.length > 0) {
        // 最初のペットをアクティブにする
        state.activePetId = action.payload[0].id;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    changeActivePet(state, action: PayloadAction<number>) {
      const petId = action.payload;
      state.activePetId = petId;
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
  } finally {
    dispatch(setLoading(false));
  }
};

// アクションのエクスポート
export const { setPets, setLoading, changeActivePet } = petsSlice.actions;

// Reducerのエクスポート
export default petsSlice.reducer;
