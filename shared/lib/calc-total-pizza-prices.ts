import { ProductItem, Ingredient } from '@prisma/client';
import { PizzaSize, PizzaType } from './../constants/pizza';

/**
 *
 * @param type выбранный тип теста пиццы
 * @param items все вариации
 * @param ingredients список ингредиентов
 * @param selectedIngredients выбранные ингредиенты
 * @param size выбранный размер пиццы
 *
 * @returns number общая стоимость
 */
export const calcTotalPizzaPrices = (
  type: PizzaType,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  size: PizzaSize,
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredients = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredients;
};
