import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, Trash2 } from "lucide-react";
import { TierList, TierItem, Tier } from "../Type";
import { TierRow } from "../components/TierRow";
import { DraggableItem } from "../components/DraggableItem";

const initialItems: TierItem[] = [
  {
    id: "1",
    name: "Mountain",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: "2",
    name: "Beach",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: "3",
    name: "Forest",
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=200&h=200",
  },
];

const initialTiers: TierList = [
  { id: "S", label: "S", color: "#FF0000", items: [] },
  { id: "A", label: "A", color: "#FF6B00", items: [] },
  { id: "B", label: "B", color: "#FFC100", items: [] },
  { id: "C", label: "C", color: "#6BC950", items: [] },
  { id: "D", label: "D", color: "#4B76E5", items: [] },
];

function TierPage() {
  const [tiers, setTiers] = useState<TierList>(initialTiers);
  const [unrankedItems, setUnrankedItems] = useState<TierItem[]>(initialItems);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemUrl, setNewItemUrl] = useState("");
  const [newItemName, setNewItemName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeItem = findItem(active.id as string);
    if (!activeItem) return;

    const overContainer = over.data?.current?.sortable?.containerId || over.id;
    const activeContainer = findTierId(active.id as string) || "unranked";

    if (activeContainer === overContainer) return;

    if (overContainer === "unranked") {
      setTiers((prev) => {
        const newTiers = prev.map((tier) => ({
          ...tier,
          items: tier.items.filter((item) => item.id !== activeItem.id),
        }));
        return newTiers;
      });
      setUnrankedItems((prev) => [...prev, activeItem]);
    } else {
      if (activeContainer === "unranked") {
        setUnrankedItems((prev) =>
          prev.filter((item) => item.id !== activeItem.id)
        );
      } else {
        setTiers((prev) => {
          return prev.map((tier) => ({
            ...tier,
            items: tier.items.filter((item) => item.id !== activeItem.id),
          }));
        });
      }

      setTiers((prev) => {
        return prev.map((tier) => {
          if (tier.id === overContainer) {
            return {
              ...tier,
              items: [...tier.items, activeItem],
            };
          }
          return tier;
        });
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const activeContainer = findTierId(active.id as string) || "unranked";
    const overContainer = over.data?.current?.sortable?.containerId || over.id;

    if (activeContainer === overContainer) {
      // Handle sorting within the same container
      if (activeContainer === "unranked") {
        const oldIndex = unrankedItems.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = unrankedItems.findIndex((item) => item.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          setUnrankedItems((items) => arrayMove(items, oldIndex, newIndex));
        }
      } else {
        setTiers((prev) => {
          return prev.map((tier) => {
            if (tier.id === activeContainer) {
              const oldIndex = tier.items.findIndex(
                (item) => item.id === active.id
              );
              const newIndex = tier.items.findIndex(
                (item) => item.id === over.id
              );
              return {
                ...tier,
                items: arrayMove(tier.items, oldIndex, newIndex),
              };
            }
            return tier;
          });
        });
      }
    }
  };

  const findItem = (id: string): TierItem | undefined => {
    for (const tier of tiers) {
      const item = tier.items.find((item) => item.id === id);
      if (item) return item;
    }
    return unrankedItems.find((item) => item.id === id);
  };

  const findTierId = (itemId: string): string | undefined => {
    for (const tier of tiers) {
      if (tier.items.some((item) => item.id === itemId)) {
        return tier.id;
      }
    }
    return undefined;
  };

  const handleAddItem = () => {
    if (newItemUrl && newItemName) {
      const newItem: TierItem = {
        id: `item-${Date.now()}`,
        name: newItemName,
        imageUrl: newItemUrl,
      };
      setUnrankedItems((prev) => [...prev, newItem]);
      setNewItemUrl("");
      setNewItemName("");
      setIsAddingItem(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Tier List Maker
        </h1>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="space-y-4">
            {tiers.map((tier) => (
              <TierRow key={tier.id} tier={tier} />
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Unranked Items
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <SortableContext
                id="unranked"
                items={unrankedItems.map((item) => item.id)}
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex flex-wrap gap-4">
                  {unrankedItems.map((item) => (
                    <DraggableItem key={item.id} item={item} />
                  ))}
                </div>
              </SortableContext>
            </div>
          </div>
        </DndContext>

        <div className="mt-8 flex gap-4">
          {isAddingItem ? (
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Item name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newItemUrl}
                onChange={(e) => setNewItemUrl(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddingItem(false);
                  setNewItemUrl("");
                  setNewItemName("");
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => setIsAddingItem(true)}
            >
              <Plus size={20} />
              Add Item
            </button>
          )}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => {
              setTiers(initialTiers.map((tier) => ({ ...tier, items: [] })));
              setUnrankedItems(initialItems);
            }}
          >
            <Trash2 size={20} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default TierPage;
