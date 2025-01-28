// import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Tier } from "../Type";
import { DraggableItem } from "./DraggableItem";

interface Props {
  tier: Tier;
}

export function TierRow({ tier }: Props) {
  const { setNodeRef } = useDroppable({
    id: tier.id,
  });

  return (
    <div className="flex items-center w-full mb-4">
      <div
        className="w-24 h-24 flex items-center justify-center text-white font-bold text-2xl rounded-lg mr-4"
        style={{ backgroundColor: tier.color }}
      >
        {tier.label}
      </div>
      <div
        ref={setNodeRef}
        className="flex-1 min-h-[6rem] bg-white rounded-lg p-4"
      >
        <SortableContext
          id={tier.id}
          items={tier.items.map((item) => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex flex-wrap gap-4">
            {tier.items.map((item) => (
              <DraggableItem key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
