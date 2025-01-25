import React, { useState, useEffect } from "react";
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
import { Plus, Trash2, Loader2 } from "lucide-react";
import { TierList, TierItem, Tier, RakutenProduct } from "../Type";
import { TierRow } from "../components/TierRow";
import { DraggableItem } from "../components/DraggableItem";
import { fetchProducts } from "../utils/fetchProductsUtils";

const initialTiers: TierList = [
  { id: "S", label: "S", color: "#FF0000", items: [] },
  { id: "A", label: "A", color: "#FF6B00", items: [] },
  { id: "B", label: "B", color: "#FFC100", items: [] },
  { id: "C", label: "C", color: "#6BC950", items: [] },
  { id: "D", label: "D", color: "#4B76E5", items: [] },
];

function TierPage() {
  const [tiers, setTiers] = useState<TierList>(initialTiers);
  const [unrankedItems, setUnrankedItems] = useState<TierItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [products, setProducts] = useState<RakutenProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts({ setProducts, setLoading });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const items: TierItem[] = products.map((product) => ({
        id: `item-${Date.now()}-${Math.random()}`,
        name: product.Item.itemName,
        imageUrl: product.Item.mediumImageUrls[0]?.imageUrl || "",
        price: product.Item.itemPrice,
        url: product.Item.itemUrl,
      }));
      setUnrankedItems(items);
    }
  }, [products]);

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

  const handleRefresh = () => {
    setLoading(true);
    fetchProducts({ setProducts, setLoading });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Product Tier List
          </h1>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            Refresh Products
          </button>
        </div>

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
              Unranked Products
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {loading ? (
                <div className="flex justify-center items-center h-24">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </DndContext>

        <div className="mt-8">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => {
              setTiers(initialTiers.map((tier) => ({ ...tier, items: [] })));
              handleRefresh();
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
