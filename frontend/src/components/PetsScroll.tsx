// PetsScroll.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActivePet } from "../redux/petsSlice"; // changeActivePetアクションをインポート
import { RootState } from "../redux/store"; // RootStateをインポート
import { Pet } from "../Type";

const PetsScroll: React.FC = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state: RootState) => state.pets.pets); // petsをReduxストアから取得

  const handleActivePetChange = (id: number) => {
    dispatch(changeActivePet(id)); // activeを切り替えるアクションをディスパッチ
  };

  return (
    <div className="flex gap-4 max-w-[1000px] mx-auto overflow-auto">
      {pets &&
        pets.map((p: Pet) => (
          <div
            key={p.id}
            className={`w-32 h-20 cursor-pointer flex justify-center items-center bg-gray-200 ${
              p.active ? "border-2 border-cyan-400" : ""
            }`}
            onClick={() => handleActivePetChange(p.id)} // クリックでアクションをディスパッチ
          >
            <p>{p.name}</p>
          </div>
        ))}
    </div>
  );
};

export default PetsScroll;
