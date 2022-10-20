import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { ICocktail } from "../../global/ICocktail";
import { Card, Tag, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
interface TProps {
  drink: ICocktail;
}

const { Meta } = Card;

export const PopularCocktail: FC<TProps> = ({ drink }) => {
  return (
    <li>
      <Card
        hoverable
        style={{ cursor: "default" }}
        cover={
          <Image
            src={drink.strDrinkThumb}
            alt={`${drink.strDrink} Image`}
            width={606}
            height={606}
          />
        }
        extra={
          <Link href={`/popular-cocktails/${drink.idDrink}`} passHref>
            <Button type="primary">More</Button>
          </Link>
        }
      >
        <Meta
          title={drink.strDrink}
          description={drink.strCategory ? drink.strCategory : ""}
        ></Meta>
        <Tag
          className="mt-3 mr-3"
          color={drink.strAlcoholic === "Alcoholic" ? "magenta" : "green"}
        >
          {drink.strAlcoholic}
        </Tag>
        {drink.strVideo ? (
          <a href={drink.strVideo} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faYoutube}
              size="lg"
              className="text-[#FF0000]"
            ></FontAwesomeIcon>
          </a>
        ) : null}
      </Card>
    </li>
  );
};
