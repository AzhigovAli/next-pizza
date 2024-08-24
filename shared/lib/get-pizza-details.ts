import { Ingredient, ProductItem } from '@prisma/client';
import { calcTotalPizzaPrices } from './calc-total-pizza-prices';
import { PizzaSize, PizzaType, mapPizzaType } from '../constants/pizza';

export const getPizzaDetails = (
  type: PizzaType,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  size: PizzaSize,
) => {
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  const totalPrice = calcTotalPizzaPrices(type, items, ingredients, selectedIngredients, size);

  return { textDetails, totalPrice };
};
