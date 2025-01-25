import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TierItem } from "../Type";
import { ExternalLink } from "lucide-react";

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
      className="relative group w-24 h-24 rounded-lg overflow-hidden shadow-md cursor-move hover:shadow-lg transition-shadow"
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-full object-cover"
      />
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-4 h-4 text-gray-600" />
        </a>
      )}
      {item.price && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
          ¥{item.price.toLocaleString()}
        </div>
      )}
    </div>
  );
}
