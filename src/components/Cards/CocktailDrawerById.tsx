import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Collapse, Drawer, Tag } from 'antd';
import Image from 'next/image';
import { FC, useState } from 'react';
import { ICocktail } from '../../global/ICocktail';
import { ICocktailsByIng } from '../../global/ICocktailsByIng';
import { getIngredientsWithNoBase64 } from '../../helpers/cockailIngredientsWithNoBase64';
import { imageCreditsName } from '../../helpers/imageCreditsName';
import { imageCreditsUrl } from '../../helpers/imageCreditsUrl';
import { fetchCocktailById } from '../../pages/api/getCocktailById';

const { Panel } = Collapse;
interface TProps {
  drink: ICocktailsByIng;
}
const { Meta } = Card;

export const CocktailDrawerById: FC<TProps> = ({ drink }) => {
  const [open, setOpen] = useState(false);
  const [cocktail, setCocktail] = useState({} as ICocktail);
  const [ingredient, setIngredient] = useState({} as { [key: string]: string });
  const showDrawer = async () => {
    // Get a single drink by its id
    const singleDrink = await fetchCocktailById(drink.idDrink);
    // const singleDrink = await fetchCocktailByIdForDrawer(drink.idDrink);
    const tempIngredientUrl = await getIngredientsWithNoBase64(singleDrink);
    setIngredient(tempIngredientUrl);
    setCocktail(singleDrink);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        size='large'
        title={cocktail.strDrink}
        placement='right'
        onClose={onClose}
        open={open}
      >
        <div className='flex justify-center mt-2'>
          <Image
            src={cocktail.strDrinkThumb}
            alt={`${cocktail.strDrink} Image`}
            width={600}
            height={600}
            style={{ borderRadius: '4px', margin: '0 auto' }}
          />
        </div>
        {imageCreditsName(cocktail.strImageAttribution) &&
        imageCreditsUrl(cocktail.strImageAttribution) ? (
          <p className='text-right text-sm font-thin'>
            Image by {imageCreditsName(cocktail.strImageAttribution)} via{' '}
            <a
              href={imageCreditsUrl(cocktail.strImageAttribution)}
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-blue-800'
            >
              {'[source link]'}
            </a>
          </p>
        ) : imageCreditsName(cocktail.strImageAttribution) &&
          !imageCreditsUrl(cocktail.strImageAttribution) ? (
          <p className='text-right text-sm font-thin'>
            Image by {imageCreditsName(cocktail.strImageAttribution)}
          </p>
        ) : null}
        <Tag
          className='mt-3 mr-3'
          color={cocktail.strAlcoholic === 'Alcoholic' ? 'magenta' : 'green'}
        >
          {cocktail.strAlcoholic}
        </Tag>
        {cocktail.strVideo ? (
          <a href={cocktail.strVideo} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon
              icon={faYoutube}
              size='lg'
              className='text-[#FF0000]'
            ></FontAwesomeIcon>
          </a>
        ) : null}
        <h2 className='text-lg py-2'>Type of glass</h2>
        <p>{cocktail.strGlass}</p>
        {cocktail.strTags && <h2 className='text-lg py-2'>Tags</h2>}
        {cocktail.strTags?.split(',').map((ele, idx) => (
          <Tag key={idx} className='mt-3 mr-3' color='blue'>
            {ele}
          </Tag>
        ))}
        <table className='table-auto min-w-full divide-y divide-gray-200 my-6'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
              >
                Ingredient
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
              >
                Measure
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            <tr>
              {cocktail.strIngredient1 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                  <span>{cocktail.strIngredient1}</span>
                  <Image
                    src={ingredient.strIngredient1Pic}
                    alt={`${cocktail.strIngredient1} image`}
                    width={130}
                    height={130}
                    className='float-right'
                  />
                </td>
              )}
              {cocktail.strMeasure1 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                  {cocktail.strMeasure1}
                </td>
              )}
            </tr>
            <tr>
              {cocktail.strIngredient2 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                  <span>{cocktail.strIngredient2}</span>
                  <Image
                    src={ingredient.strIngredient2Pic}
                    alt={`${cocktail.strIngredient2} image`}
                    width={130}
                    height={130}
                    className='float-right'
                  />
                </td>
              )}
              {cocktail.strMeasure2 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                  {cocktail.strMeasure2}
                </td>
              )}
            </tr>
            <tr>
              {cocktail.strIngredient3 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                  <span>{cocktail.strIngredient3}</span>
                  <Image
                    src={ingredient.strIngredient3Pic}
                    alt={`${cocktail.strIngredient3} image`}
                    width={130}
                    height={130}
                    className='float-right'
                  />
                </td>
              )}
              {cocktail.strMeasure3 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                  {cocktail.strMeasure3}
                </td>
              )}
            </tr>
            <tr>
              {cocktail.strIngredient4 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                  <span>{cocktail.strIngredient4}</span>
                  <Image
                    src={ingredient.strIngredient4Pic}
                    alt={`${cocktail.strIngredient4} image`}
                    width={130}
                    height={130}
                    className='float-right'
                  />
                </td>
              )}
              {cocktail.strMeasure4 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                  {cocktail.strMeasure4}
                </td>
              )}
            </tr>
            <tr>
              {cocktail.strIngredient5 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                  <span>{cocktail.strIngredient5}</span>
                  <Image
                    src={ingredient.strIngredient5Pic}
                    alt={`${cocktail.strIngredient5} image`}
                    width={130}
                    height={130}
                    className='float-right'
                  />
                </td>
              )}
              {cocktail.strMeasure5 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                  {cocktail.strMeasure5}
                </td>
              )}
            </tr>
            <tr>
              {cocktail.strIngredient6 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                  <span>{cocktail.strIngredient6}</span>
                  <Image
                    src={ingredient.strIngredient6Pic}
                    alt={`${cocktail.strIngredient6} image`}
                    width={130}
                    height={130}
                    className='float-right'
                  />
                </td>
              )}
              {cocktail.strMeasure6 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                  {cocktail.strMeasure6}
                </td>
              )}
            </tr>
            <tr>
              {cocktail.strIngredient7 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                  <span>{cocktail.strIngredient7}</span>
                  <Image
                    src={ingredient.strIngredient7Pic}
                    alt={`${cocktail.strIngredient7} image`}
                    width={130}
                    height={130}
                    className='float-right'
                  />
                </td>
              )}
              {cocktail.strMeasure7 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                  {cocktail.strMeasure7}
                </td>
              )}
            </tr>
            <tr>
              {cocktail.strIngredient8 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                  <span>{cocktail.strIngredient8}</span>
                  <Image
                    src={ingredient.strIngredient8Pic}
                    alt={`${cocktail.strIngredient8} image`}
                    width={130}
                    height={130}
                    className='float-right'
                  />
                </td>
              )}
              {cocktail.strMeasure8 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                  {cocktail.strMeasure8}
                </td>
              )}
            </tr>
            <tr>
              {cocktail.strIngredient9 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                  <span>{cocktail.strIngredient9}</span>
                  <Image
                    src={ingredient.strIngredient9Pic}
                    alt={`${cocktail.strIngredient9} image`}
                    width={130}
                    height={130}
                    className='float-right'
                  />
                </td>
              )}
              {cocktail.strMeasure9 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                  {cocktail.strMeasure9}
                </td>
              )}
            </tr>
            <tr>
              {cocktail.strIngredient10 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                  <span>{cocktail.strIngredient10}</span>
                  <Image
                    src={ingredient.strIngredient10Pic}
                    alt={`${cocktail.strIngredient10} image`}
                    width={130}
                    height={130}
                    className='float-right'
                  />
                </td>
              )}
              {cocktail.strMeasure10 && (
                <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                  {cocktail.strMeasure10}
                </td>
              )}
            </tr>
          </tbody>
        </table>
        <Collapse className='mt-4' defaultActiveKey='english'>
          <Panel header='Preparation instructions' key='english'>
            <p>{cocktail.strInstructions}</p>
          </Panel>
          {cocktail.strInstructionsES && (
            <Panel header='Instrucciones de preparación' key='spanish'>
              <p>{cocktail.strInstructionsES}</p>
            </Panel>
          )}
        </Collapse>
      </Drawer>
      <div onClick={() => showDrawer()}>
        <Card
          className='transform transition duration-300 hover:scale-[1.03]'
          hoverable
          cover={
            <Image
              src={drink.strDrinkThumb}
              alt={`${drink.strDrink} Image`}
              blurDataURL={drink.base64}
              width={606}
              height={606}
              placeholder='blur'
            />
          }
        >
          <Meta title={drink.strDrink}></Meta>
        </Card>
      </div>
    </>
  );
};
