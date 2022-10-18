import axios from "axios";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ApplicationWrapper } from "../../components/layout/ApplicationWrapper";
import { ICocktail } from "../../global/ICocktail";
import { Card, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { VideoCameraTwoTone } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
interface TProps {
  drink: ICocktail[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const config = {
    headers: {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  };
  const cocktails = await axios.get(
    "https://the-cocktail-db.p.rapidapi.com/popular.php",
    config
  );
  const { drinks } = cocktails.data;
  const paths = drinks.map((drink: ICocktail) => {
    return {
      params: { idDrink: drink.idDrink },
    };
  });
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const config = {
    params: { i: context.params?.idDrink },
    headers: {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  };
  const cocktail = await axios.get(
    "https://the-cocktail-db.p.rapidapi.com/lookup.php",
    config
  );
  const drink = cocktail.data.drinks;
  return {
    props: {
      drink,
    },
  };
};

const PopularCocktailDetailPage: NextPage<TProps> = ({ drink }) => {
  return (
    <ApplicationWrapper title={drink[0].strDrink}>
      {drink.map((ele) => (
        <div
          key={uuidv4()}
          className="min-h-screen flex flex-col justify-center items-center content-start bg-slate-200"
        >
          <h1 className="text-4xl py-3 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
            {ele.strDrink}
          </h1>
          <Card
            hoverable
            className="mb-6"
            style={{ cursor: "default", maxWidth: "600px" }}
            cover={
              <Image
                src={ele.strDrinkThumb}
                alt={`${ele.strDrink} Image`}
                width={606}
                height={606}
              />
            }
            extra={
              <Link href="/popular-cocktails">
                <a>Go back</a>
              </Link>
            }
          >
            <Tag
              className="mt-3 mr-3"
              color={ele.strAlcoholic === "Alcoholic" ? "magenta" : "green"}
            >
              {ele.strAlcoholic}
            </Tag>
            {ele.strVideo ? (
              <a href={ele.strVideo} target="_blank" rel="noreferrer">
                <VideoCameraTwoTone />
              </a>
            ) : null}
            <h2 className="text-lg py-2">Type of glass</h2>
            <p>{ele.strGlass}</p>
            <h2 className="text-lg py-2">Tags</h2>
            {ele.strTags?.split(",").map((ele) => (
              <Tag key={uuidv4()} className="mt-3 mr-3" color="blue">
                {ele}
              </Tag>
            ))}
          </Card>
        </div>
      ))}
    </ApplicationWrapper>
  );
};

export default PopularCocktailDetailPage;
