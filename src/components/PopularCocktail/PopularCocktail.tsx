import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { ICocktail } from "../../global/ICocktail";

interface TProps {
  drink: ICocktail;
}

export const PopularCocktail: FC<TProps> = ({ drink }) => {
  return (
    <li>
      <Link href={`/popular-cocktails/${drink.idDrink}`}>
        <Image
          className="cursor-pointer"
          src={drink.strDrinkThumb}
          alt={`${drink.strDrink} Image`}
          width={606}
          height={606}
        />
      </Link>
      <p className="text-lg">{drink.strDrink}</p>
    </li>
  );
};
