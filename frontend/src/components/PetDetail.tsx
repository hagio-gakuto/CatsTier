import React from "react";

// import PetsScroll from "./PetsScroll";
import { Pet } from "../Type";
import { UserPets } from "../utils/fetchUserPetsUtil";

const PetDetail: React.FC = () => {
  //   const [pets, setPets] = useState([]);

  //   useEffect(() => {
  //     console.log("aaa");
  //     console.log(Cookies.get("userPets"));
  //     setPets(
  //       Cookies.get("userPets")
  //         ? JSON.parse(Cookies.get("userPets") as string)
  //         : null
  //     );
  //   }, []);

  return (
    <>
      <div className="">
        {UserPets &&
          UserPets.filter((p: Pet) => p.active).map((p: Pet) => (
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
    </>
  );

  // pathが"/pets"の場合は何も表示しない
  return null;
};

export default PetDetail;
