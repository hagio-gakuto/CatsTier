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
import axios from "axios";
import { ProductType } from "../components/Product";

export default function TierPage() {
  const [products, setProducts] = useState<[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      // setLoading(true);
      // setError(null);  // エラーメッセージをリセット

      try {
        const response = await axios.get(
          "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706",
          {
            params: {
              applicationId: "1009937209585955269", // 取得したアプリIDを指定
              keyword: "cat", // 検索する商品名
              hits: 10, // 取得する商品の数
            },
          }
        );
        setProducts(response.data.Items); // 商品情報をstateに保存
      } catch (err) {
        console.error("Error during fetching products:", err);
        // setError("商品情報の取得に失敗しました");
      } finally {
        // setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const newColumns = [
      { id: "S", title: "S", cards: [] },
      { id: "A", title: "A", cards: [] },
      { id: "B", title: "B", cards: [] },
      { id: "C", title: "C", cards: [] },
      { id: "D", title: "D", cards: [] },
      {
        id: "waiting",
        title: "ドラッグ",
        cards: products.map((product: ProductType) => ({
          id: product.Item.itemCode, // unique IDとしてproductCodeを使う
          Item: product.Item, // 商品情報を展開
        })),
      },
    ];
    setColumns(newColumns); // columnsを更新
  }, [products]);

  const [columns, setColumns] = useState<ColumnType[]>([]);

  const findColumn = (unique: string | null) => {
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
      return c.cards.map((i) => ({
        itemId: i.Item.productCode,
        columnId: columnId,
      }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    console.log(event);
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
      const activeIndex = activeItems.findIndex(
        (i) => i.Item.productCode === activeId
      );
      const overIndex = overItems.findIndex(
        (i) => i.Item.productCode === overId
      );
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.Item.productCode !== activeId);
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
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex(
      (i) => i.Item.productCode === activeId
    );
    const overIndex = overColumn.cards.findIndex(
      (i) => i.Item.productCode === overId
    );
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
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    // DndContextはDrag and Dropを行うためのコンテキストです。
    // sensorsにはPointerSensorとKeyboardSensorを指定します。
    // collisionDetectionにはclosestCornersを指定します。
    // onDragEndはドラッグが終了したときに発火する関数です。
    // onDragOverはドラッグ中に発火する関数です。
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
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
