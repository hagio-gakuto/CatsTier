import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  //   DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TierList, TierItem, RakutenProduct } from "../Type";
import { TierRow } from "../components/TierRow";
import { DraggableItem } from "../components/DraggableItem";
import SearchForm from "../components/SearchForm";
import Loading from "../components/Loading";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CategoryIcon from "@mui/icons-material/Category";
import { axiosFunction } from "../utils/axiosUtil";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const initialTiers: TierList = [
  { id: "S", label: "S", color: "#FF0000", items: [] },
  { id: "A", label: "A", color: "#FF6B00", items: [] },
  { id: "B", label: "B", color: "#FFC100", items: [] },
  { id: "C", label: "C", color: "#6BC950", items: [] },
  { id: "D", label: "D", color: "#4B76E5", items: [] },
];

function TierPage() {
  const [dbTiers, setDbTiers] = useState<Record<string, TierItem[]>>({});
  const [tiers, setTiers] = useState<TierList>(initialTiers);
  const [unrankedItems, setUnrankedItems] = useState<TierItem[]>([]);
  //   const [activeId, setActiveId] = useState<string | null>(null);
  const [products, setProducts] = useState<RakutenProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [tierCategory, setTierCategory] = useState([]);
  const [showCategory, setShowCategory] = useState<string | undefined>();
  const [movedItem, setMovedItem] = useState<string | undefined>();
  const [moveToContainer, setMoveToContainer] = useState<string | undefined>();
  const { activePetId } = useSelector((state: RootState) => state.pets);
  const uid = Cookies.get("uid") as string;

  //console.log("uid", uid);
  // console.log(showCategory);

  // 初期表示
  useEffect(() => {
    // カテゴリ
    const tierCategoryData = {
      categoryType: "tierカテゴリ",
    };
    axiosFunction({
      api: "api/tier/category",
      data: tierCategoryData,
      setResult: setTierCategory,
      method: "get",
    });
    // 登録されているtierの取得
    if (showCategory === undefined) return;
    const tierData = {
      petId: activePetId,
      tierCategory: showCategory,
    };
    // console.log(tierData);
    axiosFunction({
      api: "api/tier",
      data: tierData,
      setResult: setDbTiers,
      method: "get",
    });
  }, [activePetId, showCategory]);

  // カテゴリの変更
  useEffect(() => {
    // カテゴリ
    setShowCategory(tierCategory[0]);
  }, [tierCategory]);

  // 登録されているtierの取得
  useEffect(() => {
    if (showCategory === undefined) return;
    // 登録されているtierの取得
    const tierData = {
      petId: activePetId,
      tierCategory: showCategory,
    };
    axiosFunction({
      api: "api/tier",
      data: tierData,
      setResult: setDbTiers,
      method: "get",
    });
  }, [activePetId, showCategory]);

  // 登録されているtierをtiersに
  useEffect(() => {
    if (Object.keys(dbTiers).length === 0) return; // ← dbTiersはオブジェクトだから lengthじゃなくて keysで判定！
    console.log("DBtiers", dbTiers);
    setLoading(true);

    const transformed = tiers.map((tier) => {
      // dbTiersの中から「対応するtierRank」の配列を探す
      const dbTierItems = dbTiers[tier.label.toLowerCase()];
      if (!dbTierItems) return tier; // 存在しないならそのまま返す

      return {
        ...tier,
        items: dbTierItems, // 正しくitemsにセットして、新しいオブジェクトを返す！
      };
    });

    console.log("transformed", transformed);
    setTiers(transformed);
    setLoading(false);
  }, [dbTiers]);

  useEffect(() => {
    if (products.length > 0) {
      const items: TierItem[] = products.map((product) => ({
        id: `item-${Date.now()}-${Math.random()}`,
        itemCode: product.Item.itemCode || "",
        name: product.Item.itemName,
        imageUrl: product.Item.mediumImageUrls[0]?.imageUrl || "",
        price: product.Item.itemPrice,
        url: product.Item.itemUrl,
        genreId: product.Item.genreId || "",
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

  //   const handleDragStart = (event: DragStartEvent) => {
  //     setActiveId(event.active.id as string);
  //   };

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
    // setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeContainer = findTierId(activeId) || "unranked";
    const overContainer = over.data?.current?.sortable?.containerId || overId;

    // 対象のアイテムを取得
    const allItems = [...tiers.flatMap((tier) => tier.items), ...unrankedItems];
    const movedItem = allItems.find((item) => item.id === activeId);

    if (!movedItem) return;

    // === console.log 出力 ===
    setMovedItem(movedItem.itemCode);
    // console.log("🛫 移動元コンテナ:", activeContainer);
    // console.log("🛬 移動先コンテナ:", overContainer);
    setMoveToContainer(overContainer);

    if (activeContainer === overContainer) {
      if (activeContainer === "unranked") {
        const oldIndex = unrankedItems.findIndex(
          (item) => item.id === activeId
        );
        const newIndex = unrankedItems.findIndex((item) => item.id === overId);
        if (oldIndex !== -1 && newIndex !== -1) {
          setUnrankedItems((items) => arrayMove(items, oldIndex, newIndex));
        }
      } else {
        setTiers((prev) =>
          prev.map((tier) => {
            if (tier.id === activeContainer) {
              const oldIndex = tier.items.findIndex(
                (item) => item.id === activeId
              );
              const newIndex = tier.items.findIndex(
                (item) => item.id === overId
              );
              return {
                ...tier,
                items: arrayMove(tier.items, oldIndex, newIndex),
              };
            }
            return tier;
          })
        );
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

  // const handleRefresh = () => {
  //   setLoading(true);
  //   fetchProducts({ setProducts, setLoading });
  // };

  useEffect(() => {
    if (!movedItem) return;
    if (!moveToContainer) return;

    // console.log("movedItem", movedItem);
    // console.log("tiers", tiers);
    const rank = tiers
      .filter((tier) => tier.items.some((item) => item.itemCode === movedItem))
      .map((obj) => ({
        // movedItemの順位を取得(配列のなかのどの位置にあるか)
        rank: obj.items.findIndex((item) => item.itemCode === movedItem),
        //obj.items.map((item) =>  item.id === movedItem ? obj.id : null),
      }));

    //console.log("rank", rank);

    const data = {
      petId: activePetId,
      uid: uid,
      itemCode: movedItem,
      tierCategory: showCategory,
      tierRank: moveToContainer,
      rankInTier: rank[0].rank,
    };
    console.log(data);

    axiosFunction({
      api: "api/tier",
      data: data,
      setResult: () => {},
      method: "put",
    });
    // const unrankedItems = transformed.reduce((acc, obj) => {
    //   const items = Object.values(obj)[0];
    //   return acc.concat(items);
    // }, []);
  }, [movedItem, moveToContainer]);

  if (loading) {
    return <Loading message="読み込み中" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl ">
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 absolute left-8">
              {tierCategory
                .filter((c) => c === showCategory)
                .map((category) => (
                  <span
                    key={category}
                    className="text-2xl font-bold text-gray-900"
                  >
                    {category}
                  </span>
                ))}
            </h1>

            <RestaurantIcon
              fontSize="large"
              color={showCategory === "Food" ? "primary" : "inherit"}
              onClick={() => setShowCategory(tierCategory[0])}
              className="cursor-pointer"
            />
            <CategoryIcon
              fontSize="large"
              color={showCategory === "Goods" ? "primary" : "inherit"}
              onClick={() => setShowCategory(tierCategory[1])}
              className="cursor-pointer"
            />
          </div>
        </div>

        <DndContext
          sensors={sensors}
          //   onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="space-y-4">
            {tiers.map((tier) => (
              <TierRow key={tier.id} tier={tier} />
            ))}
          </div>

          <div className="mt-8">
            <div className="flex">
              <SearchForm setProducts={setProducts} setLoading={setLoading} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md min-h-32 mt-4">
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

        {/* <div className="mt-8">
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
        </div> */}
      </div>
    </div>
  );
}

export default TierPage;
