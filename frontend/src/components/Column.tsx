import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card, { CardType } from "./Card";

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

const Column: FC<ColumnType> = ({ id, title, cards }) => {
  const { setNodeRef } = useDroppable({ id: id });
  //   console.log(id);
  //   console.log(cards);
  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        className="bg-red-700 rounded-lg p-2 my-2 flex items-center flex-wrap w-full"
      >
        <p className="text-center text-lg font-bold py-8 px-8 bg-gray-600 w-[10%] h-full">
          {title}
        </p>
        <div className="flex flex-wrap justify-start w-[90%]">
          {cards.map((card) => (
            <Card key={card.id} id={card.id} Item={card.Item}></Card>
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default Column;
