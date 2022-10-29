import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ApplicationWrapper } from "../../components/layout/ApplicationWrapper";
import { ICocktail } from "../../global/ICocktail";
import { Card, Tag, Collapse, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { imageCreditsName } from "../../helpers/imageCreditsName";
import { imageCreditsUrl } from "../../helpers/imageCreditsUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { fetchPopularCocktails } from "../../libs/fetchPopularCocktails";
import {fetchCocktailById} from "../../libs/fetchCocktailById"

const { Panel } = Collapse;
interface TProps {
  drink: ICocktail[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const drinks = await fetchPopularCocktails();
  const paths = drinks.map((drink: ICocktail) => {
    return {
      params: { idDrink: drink.idDrink },
    };
  });
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.idDrink as string
  const drink = await fetchCocktailById(id);
  return {
    props: {
      drink,
    },
    //Incremental Static Regeneration
    revalidate: 60,
  };
};

const engInstructionsCollapseKey = uuidv4();

const PopularCocktailDetailPage: NextPage<TProps> = ({ drink }) => {
  return (
    <ApplicationWrapper title={drink[0].strDrink}>
      {drink.map((ele) => (
        <div
          key={uuidv4()}
          className="min-h-screen flex flex-col justify-center items-center bg-slate-200"
        >
          <h1 className="text-4xl py-3 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
            {ele.strDrink}
          </h1>
          <Card
            hoverable
            className="mb-6 cursor-default max-w-[600px]"
            cover={
              <div className="flex justify-center mt-2">
                <Image
                  src={ele.strDrinkThumb}
                  alt={`${ele.strDrink} Image`}
                  width={500}
                  height={500}
                  style={{ borderRadius: "4px" }}
                />
              </div>
            }
            extra={
              <Link href="/popular-cocktails" passHref>
                <Button type="primary">Go Back</Button>
              </Link>
            }
          >
            {imageCreditsName(ele.strImageAttribution) &&
            imageCreditsUrl(ele.strImageAttribution) ? (
              <p className="text-right text-sm font-thin">
                Image by {imageCreditsName(ele.strImageAttribution)} via{" "}
                <a
                  href={imageCreditsUrl(ele.strImageAttribution)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-800"
                >
                  {"[source link]"}
                </a>
              </p>
            ) : imageCreditsName(ele.strImageAttribution) &&
              !imageCreditsUrl(ele.strImageAttribution) ? (
              <p className="text-right text-sm font-thin">
                Image by {imageCreditsName(ele.strImageAttribution)}
              </p>
            ) : null}

            <Tag
              className="mt-3 mr-3"
              color={ele.strAlcoholic === "Alcoholic" ? "magenta" : "green"}
            >
              {ele.strAlcoholic}
            </Tag>
            {ele.strVideo ? (
              <a href={ele.strVideo} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faYoutube}
                  size="lg"
                  className="text-[#FF0000]"
                ></FontAwesomeIcon>
              </a>
            ) : null}
            <h2 className="text-lg py-2">Type of glass</h2>
            <p>{ele.strGlass}</p>
            {ele.strTags && <h2 className="text-lg py-2">Tags</h2>}
            {ele.strTags?.split(",").map((ele) => (
              <Tag key={uuidv4()} className="mt-3 mr-3" color="blue">
                {ele}
              </Tag>
            ))}
            <table className="table-auto min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Ingredient
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Measure
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  {ele.strIngredient1 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strIngredient1}
                    </td>
                  )}
                  {ele.strMeasure1 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strMeasure1}
                    </td>
                  )}
                </tr>
                <tr>
                  {ele.strIngredient2 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strIngredient2}
                    </td>
                  )}
                  {ele.strMeasure2 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strMeasure2}
                    </td>
                  )}
                </tr>
                <tr>
                  {ele.strIngredient3 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strIngredient3}
                    </td>
                  )}
                  {ele.strMeasure3 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strMeasure3}
                    </td>
                  )}
                </tr>
                <tr>
                  {ele.strIngredient4 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strIngredient4}
                    </td>
                  )}
                  {ele.strMeasure4 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strMeasure4}
                    </td>
                  )}
                </tr>
                <tr>
                  {ele.strIngredient5 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strIngredient5}
                    </td>
                  )}
                  {ele.strMeasure5 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strMeasure5}
                    </td>
                  )}
                </tr>
                <tr>
                  {ele.strIngredient6 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strIngredient6}
                    </td>
                  )}
                  {ele.strMeasure6 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strMeasure6}
                    </td>
                  )}
                </tr>
                <tr>
                  {ele.strIngredient7 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strIngredient7}
                    </td>
                  )}
                  {ele.strMeasure7 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strMeasure7}
                    </td>
                  )}
                </tr>
                <tr>
                  {ele.strIngredient8 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strIngredient8}
                    </td>
                  )}
                  {ele.strMeasure8 && (
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {ele.strMeasure8}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
            <Collapse
              className="mt-4"
              defaultActiveKey={engInstructionsCollapseKey}
            >
              <Panel
                header="Preparation instructions"
                key={engInstructionsCollapseKey}
              >
                <p>{ele.strInstructions}</p>
              </Panel>
              {ele.strInstructionsES && (
                <Panel header="Instrucciones de preparación" key={uuidv4()}>
                  <p>{ele.strInstructionsES}</p>
                </Panel>
              )}
            </Collapse>
          </Card>
        </div>
      ))}
    </ApplicationWrapper>
  );
};

export default PopularCocktailDetailPage;
