import React from "react";
import Cookies from "js-cookie";
import { Pet } from "../Type";
import { UserPets } from "../utils/fetchUserPetsUtil";

const PetsScroll: React.FC = () => {
  // const [pets, setPets] = useState<Pet[]>([]);

  // useEffect(() => {
  //   setPets(
  //     Cookies.get("userPets")
  //       ? JSON.parse(Cookies.get("userPets") as string)
  //       : null
  //   );
  // }, []);

  const handleActivePetChange = (id: number) => {
    // 現在のactiveをfalseにする
    // setPets((prevPets) =>
    //   prevPets.map((pet) => ({
    //     ...pet,
    //     active: pet.id === id ? true : false, // idが一致するペットだけactiveをtrueに
    //   }))
    // );
    // // IDと一致するpetのactiveをtrueに変更（setPetsで更新）
    // const pet = pets.find((p: Pet) => p.id === id);
    // if (pet) {
    //   pet.active = true; // petのactiveプロパティをtrueに設定
    // }
    // // 更新されたpetsをCookiesに保存
    // Cookies.set("userPets", JSON.stringify(pets)); // petsをJSON形式で保存
    // window.location.reload();
  };

  return (
    <div className="flex gap-4 max-w-[1000px] mx-auto overflow-auto">
      {UserPets &&
        UserPets.map((p: Pet) => (
          <div
            key={p.id}
            className={` w-32 h-20 cursor-pointer flex justify-center items-center bg-gray-200 ${
              p.active ? "border-2 border-cyan-400" : ""
            }`}
            onClick={() => handleActivePetChange(p.id)}
          >
            <p>{p.name}</p>
          </div>
        ))}
    </div>
  );
};

export default PetsScroll;
