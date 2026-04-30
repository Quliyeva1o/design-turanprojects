export interface Category {
  id: string;
  label: string;
  icon: string;
  options: Option[];
}
export type Selections = Record<string, string>;


export interface CatalogPanelProps {
  categories: Category[];
  selections: Selections;
  onSelect: (categoryId: string, key: string) => void;
  isNight: boolean;
}

export interface TileCardProps {
  option: Option;
  isSelected: boolean;
  isNight: boolean;
  onClick: () => void;
}

export interface Option {
  key: string;
  label: string;
  gunduz: string;
  gece: string;
}

export interface ImageLayerProps {
  src: string;
  isActive: boolean;
  zIndex: number;
  alt: string;
  style?: React.CSSProperties;
}