import axios from "axios";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ApplicationWrapper } from "../../components/layout/ApplicationWrapper";
import { ICocktail } from "../../global/ICocktail";
import { Card, Tag } from "antd";
import Image from "next/image";
import { VideoCameraTwoTone } from "@ant-design/icons";
interface TProps {
  drink: ICocktail;
}

const PopularCocktailDetailPage: NextPage<TProps> = ({ drink }) => {
  return (
    <ApplicationWrapper title={drink.strDrink}>
      <div className="flex flex-col justify-center items-center p-6 bg-slate-200">
        <h1 className="text-4xl pb-6 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
          {drink.strDrink}
        </h1>
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
        >
          <Tag
            className="mt-3 mr-3"
            color={drink.strAlcoholic === "Alcoholic" ? "magenta" : "green"}
          >
            {drink.strAlcoholic}
          </Tag>
          {drink.strVideo ? (
            <a href={drink.strVideo} target="_blank" rel="noreferrer">
              <VideoCameraTwoTone />
            </a>
          ) : null}
        </Card>
      </div>
    </ApplicationWrapper>
  );
};

export default PopularCocktailDetailPage;

//TODO: revisar esta función porque está dando problemas
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
      params: { idDrink: drink.idDrink.toString() },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context);
  const config = {
    params: { i: context.params?.idDrink },
    headers: {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  };
  const cocktails = await axios.get(
    "https://the-cocktail-db.p.rapidapi.com/lookup.php",
    config
  );
  const { drinks } = cocktails.data;
  return {
    props: {
      drinks,
    },
  };
};
