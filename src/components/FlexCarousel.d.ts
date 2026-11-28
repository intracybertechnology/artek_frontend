import type { ComponentType } from "react";

interface Item {
  src: string;
  title: string;
}

interface FlexCarouselProps {
  items: Item[];
  intro?: "none" | "fade";
  cardHeight?: number;
  radius?: number;
  fit?: "natural" | "landscape" | "portrait" | "square";
  containImages?: boolean;
  autoplay?: boolean;
  driftSpeed?: number;
  interval?: number;
  captions?: boolean;
  captureWheel?: boolean;
  focusOnClick?: boolean;
  ariaLabel?: string;
  onChange?: (index: number, item: Item) => void;
  onSelect?: (index: number, item: Item) => void;
  onUnavailable?: () => void;
}

declare const FlexCarousel: ComponentType<FlexCarouselProps>;
export default FlexCarousel;
