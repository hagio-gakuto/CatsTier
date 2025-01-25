import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TierItem } from "../Type";

interface Props {
  item: TierItem;
}

export function DraggableItem({ item }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
      ? `${transition}, transform 200ms ease-in-out`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-24 h-24 rounded-lg overflow-hidden shadow-md cursor-move hover:shadow-lg transition-shadow"
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
