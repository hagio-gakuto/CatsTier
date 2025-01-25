export interface RakutenProduct {
  Item: {
    itemName: string;
    itemPrice: number;
    itemUrl: string;
    mediumImageUrls: Array<{ imageUrl: string }>;
  };
}

export interface TierItem {
  id: string;
  name: string;
  imageUrl: string;
  price?: number;
  url?: string;
}

export interface Tier {
  id: string;
  label: string;
  color: string;
  items: TierItem[];
}

export type TierList = Tier[];
