'use client';

import { cn } from '../../lib/utils';
import React, { FC } from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options';
import { getPizzaDetails } from '@/shared/lib';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  loading?: boolean;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
}
export const ChoosePizzaForm: FC<Props> = ({
  imageUrl,
  className,
  name,
  ingredients,
  loading,
  items,
  onSubmit,
}) => {
  const {
    size,
    type,
    availableSizes,
    currentItemId,
    selectedIngredients,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { textDetails, totalPrice } = getPizzaDetails(
    type,
    items,
    ingredients,
    selectedIngredients,
    size,
  );

  const handleClick = () => {
    if (currentItemId) {
      onSubmit?.(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                price={ingredient.price}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          onClick={handleClick}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
