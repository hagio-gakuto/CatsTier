// PetDetail.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPets } from "../redux/petsSlice"; // fetchUserPetsアクション
import { RootState } from "../redux/store"; // RootStateのインポート
import { Pet } from "../Type";
import { AppDispatch } from "../redux/store";
import Loading from "./Loading";

const PetDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pets, loading, activePetId } = useSelector(
    (state: RootState) => state.pets
  );

  // ペットデータを取得するためにコンポーネントがマウントされたときに実行
  useEffect(() => {
    if (pets.length === 0) {
      dispatch(fetchUserPets()); // ペットデータを取得
    }
  }, [dispatch, pets.length]);

  if (loading) {
    return <Loading message="ペット情報を取得中" />; // ローディング中は表示
  }

  return (
    <div>
      {pets &&
        pets
          .filter((p: Pet) => p.id === activePetId)
          .map((p: Pet) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                {/* アイコン画像 */}
                <img
                  src={p.icon || "/default-icon.png"} // アイコンがない場合のデフォルト画像
                  alt={p.name}
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-200 mb-4"
                />

                {/* ペット名 */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {p.name}
                </h3>

                {/* ペットの詳細情報 */}
                <div className="text-center text-sm text-gray-600">
                  {p.activeLevelName && (
                    <p className="mb-1">活動レベル: {p.activeLevelName}</p>
                  )}
                  {p.birthday && (
                    <p className="mb-1">
                      誕生日: {new Date(p.birthday).toLocaleDateString()}
                    </p>
                  )}
                  {p.breedName && <p className="mb-1">品種: {p.breedName}</p>}
                  {p.breedingPlaceName && (
                    <p className="mb-1">飼育場所: {p.breedingPlaceName}</p>
                  )}
                  {p.contraceptionName && (
                    <p className="mb-1">避妊状態: {p.contraceptionName}</p>
                  )}
                  {p.sexName && <p className="mb-1">性別: {p.sexName}</p>}
                  {p.speciesName && (
                    <p className="mb-1">種別: {p.speciesName}</p>
                  )}
                  {p.weight && <p className="mb-1">体重: {p.weight} kg</p>}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default PetDetail;
