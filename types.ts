export interface BillboardTypes {
  id: string;
  label: string;
  imageUrl: string;
};

export interface CategoryTypes {
  id: string;
  name: string;
  billboard: BillboardTypes;
  billboardId: string;
};

export interface ProductTypes {
  id: string;
  name: string;
  price: string;
  isFeatured: boolean;
  category: CategoryTypes;
  size: SizeTypes;
  color: ColorTypes;
  images: ImageTypes[];
}

export interface ImageTypes {
  id: string;
  url: string;
}

export interface SizeTypes {
  id: string;
  name: string;
  value: string;
}

export interface ColorTypes {
  id: string;
  name: string;
  value: string;
}

export interface PriceTypes {
  id: string;
  name: string;
  value: string;
}

export interface SortTypes {
  id: string;
  name: string;
  value: string;
}