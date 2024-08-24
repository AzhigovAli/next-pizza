export interface CartItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  details: string;
  quantity: number;
  className?: string;
  disabled?: boolean;
}
