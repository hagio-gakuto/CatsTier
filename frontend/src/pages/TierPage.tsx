import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column, { ColumnType } from "../components/Column";
import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/fetchProductsUtils";
import { ProductType } from "../components/Product";

export default function TierPage() {
  // 仮データを定義

  const [products, setProducts] = useState<[]>([]);
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    fetchProducts({ setProducts });
  }, []);

  useEffect(() => {
    // console.log(products);
    const data: ColumnType[] = [
      {
        id: "Column1",
        title: "Column1",
        cards: [
          {
            id: "1",
            Item: {
              itemCode: "1",
              catchcopy: "catchcopy",
              genreId: "genreId",
              itemCaption: "itemCaption",
              itemName: "itemName",
              itemPrice: 1000,
              itemUrl: "itemUrl",
              mediumImageUrls: [{ imageUrl: "imageUrl" }],
              pointRate: 10,
              reviewAverage: 4.5,
              reviewCount: 100,
              shopName: "shopName",
              shopUrl: "shopUrl",
            },
          },
        ],
      },
      {
        id: "Column2",
        title: "Column2",
        cards: products.map((product: ProductType) => ({
          id: product.Item.itemCode, // unique IDとしてproductCodeを使う
          Item: product.Item, // 商品情報を展開
        })),
      },
    ];
    setColumns(data);
  }, [products]);

  const findColumn = (unique: string | null) => {
    console.log(unique);
    if (!unique) {
      return null;
    }
    // overの対象がcolumnの場合があるためそのままidを返す
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    // console.log(event);
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // console.log(event);
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    // console.log(activeColumn);
    const overColumn = findColumn(overId);
    // console.log(overColumn);

    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    // console.log(activeIndex);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    // console.log(overIndex);

    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        });
      });
    } else {
      console.log("activeIndex === overIndex");
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div
        className="App"
        style={{ display: "flex", flexDirection: "row", padding: "20px" }}
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
          ></Column>
        ))}
      </div>
    </DndContext>
  );
}
