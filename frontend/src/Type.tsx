export interface TierItem {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Tier {
  id: string;
  label: string;
  color: string;
  items: TierItem[];
}

export type TierList = Tier[];
