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

export type Pet = {
  id: number;
  name: string;
  active: boolean;
  activeLevel: number | null;
  activeLevelName: string | null;
  birthday: string | null;
  breed: number;
  breedName: string | null;
  breedingPlace: number | null;
  breedingPlaceName: string | null;
  contraception: number | null;
  contraceptionName: string | null;
  icon: string | null;
  sex: number | null;
  sexName: string | null;
  species: number;
  speciesName: string;
  weight: number | null;
};
