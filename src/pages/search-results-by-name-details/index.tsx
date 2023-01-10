import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Collapse, Tag } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import { v4 as uuidv4 } from 'uuid';
import { ApplicationWrapper } from '../../components/layout/ApplicationWrapper';
import { ICocktail } from '../../global/ICocktail';
import { imageCreditsName } from '../../helpers/imageCreditsName';
import { imageCreditsUrl } from '../../helpers/imageCreditsUrl';
import { fetchCocktailById } from '../api/getCocktailById';
import { getIngredientsFromCocktail } from '../../helpers/cocktailIngredients';
import { IIngredients } from '../../global/IIngredients';

const { Panel } = Collapse;
interface TProps {
  drink: ICocktail;
  ingredientUrl: IIngredients;
}

const engInstructionsCollapseKey = uuidv4();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query['id'] as string;
  // Get a single drink by its id
  const singleDrink = await fetchCocktailById(id);
  const ingredientUrl = await getIngredientsFromCocktail(singleDrink);
  const { base64, img } = await getPlaiceholder(singleDrink.strDrinkThumb);
  const drink = { ...singleDrink, base64, img };
  return {
    props: { drink, ingredientUrl },
  };
};

const CocktailByNameById: NextPage<TProps> = ({ drink, ingredientUrl }) => {
  const router = useRouter();
  return (
    <ApplicationWrapper title={drink.strDrink}>
      <div
        key={uuidv4()}
        className='min-h-screen flex flex-col justify-center items-center bg-slate-200'
      >
        <h1 className='text-4xl py-3 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-zinc-800 to-zinc-600'>
          {drink.strDrink}
        </h1>
        <Card
          hoverable
          className='mb-6 cursor-default md:max-w-[600px] lg:min-w-[600px] xl:min-w-[600px]'
          cover={
            <div className='flex justify-center mt-2'>
              <Image
                src={drink.img}
                alt={`${drink.strDrink} Image`}
                width={500}
                height={500}
                blurDataURL={drink.base64}
                placeholder='blur'
                style={{ borderRadius: '4px', margin: '0 auto' }}
              />
            </div>
          }
          extra={
            <Button
              type='primary'
              className='my-3'
              onClick={() => router.back()}
              danger
            >
              Go Back
            </Button>
          }
        >
          {imageCreditsName(drink.strImageAttribution) &&
          imageCreditsUrl(drink.strImageAttribution) ? (
            <p className='text-right text-sm font-thin'>
              Image by {imageCreditsName(drink.strImageAttribution)} via{' '}
              <a
                href={imageCreditsUrl(drink.strImageAttribution)}
                target='_blank'
                rel='noopener noreferrer'
                className='underline text-blue-800'
              >
                {'[source link]'}
              </a>
            </p>
          ) : imageCreditsName(drink.strImageAttribution) &&
            !imageCreditsUrl(drink.strImageAttribution) ? (
            <p className='text-right text-sm font-thin'>
              Image by {imageCreditsName(drink.strImageAttribution)}
            </p>
          ) : null}

          <Tag
            className='mt-3 mr-3'
            color={drink.strAlcoholic === 'Alcoholic' ? 'magenta' : 'green'}
          >
            {drink.strAlcoholic}
          </Tag>
          {drink.strVideo ? (
            <a href={drink.strVideo} target='_blank' rel='noopener noreferrer'>
              <FontAwesomeIcon
                icon={faYoutube}
                size='lg'
                className='text-[#FF0000]'
              ></FontAwesomeIcon>
            </a>
          ) : null}
          <h2 className='text-lg py-2'>Type of glass</h2>
          <p>{drink.strGlass}</p>
          {drink.strTags && <h2 className='text-lg py-2'>Tags</h2>}
          {drink.strTags?.split(',').map((ele) => (
            <Tag key={uuidv4()} className='mt-3 mr-3' color='blue'>
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
                {drink.strIngredient1 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                    <span>{drink.strIngredient1}</span>
                    <Image
                      src={ingredientUrl.strIngredient1Pic.img}
                      alt='Ingredient image'
                      blurDataURL={ingredientUrl.strIngredient1Pic.base64}
                      placeholder='blur'
                      width={130}
                      height={130}
                      className='float-right'
                    />
                  </td>
                )}
                {drink.strMeasure1 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                    {drink.strMeasure1}
                  </td>
                )}
              </tr>
              <tr>
                {drink.strIngredient2 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                    <span>{drink.strIngredient2}</span>
                    <Image
                      src={ingredientUrl.strIngredient2Pic.img}
                      alt='Ingredient image'
                      blurDataURL={ingredientUrl.strIngredient2Pic.base64}
                      placeholder='blur'
                      width={130}
                      height={130}
                      className='float-right'
                    />
                  </td>
                )}
                {drink.strMeasure2 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                    {drink.strMeasure2}
                  </td>
                )}
              </tr>
              <tr>
                {drink.strIngredient3 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                    <span>{drink.strIngredient3}</span>
                    <Image
                      src={ingredientUrl.strIngredient3Pic.img}
                      alt='Ingredient image'
                      blurDataURL={ingredientUrl.strIngredient3Pic.base64}
                      placeholder='blur'
                      width={130}
                      height={130}
                      className='float-right'
                    />
                  </td>
                )}
                {drink.strMeasure3 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                    {drink.strMeasure3}
                  </td>
                )}
              </tr>
              <tr>
                {drink.strIngredient4 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                    <span>{drink.strIngredient4}</span>
                    <Image
                      src={ingredientUrl.strIngredient4Pic.img}
                      alt='Ingredient image'
                      blurDataURL={ingredientUrl.strIngredient4Pic.base64}
                      placeholder='blur'
                      width={130}
                      height={130}
                      className='float-right'
                    />
                  </td>
                )}
                {drink.strMeasure4 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                    {drink.strMeasure4}
                  </td>
                )}
              </tr>
              <tr>
                {drink.strIngredient5 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                    <span>{drink.strIngredient5}</span>
                    <Image
                      src={ingredientUrl.strIngredient5Pic.img}
                      alt='Ingredient image'
                      blurDataURL={ingredientUrl.strIngredient5Pic.base64}
                      placeholder='blur'
                      width={130}
                      height={130}
                      className='float-right'
                    />
                  </td>
                )}
                {drink.strMeasure5 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                    {drink.strMeasure5}
                  </td>
                )}
              </tr>
              <tr>
                {drink.strIngredient6 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                    <span>{drink.strIngredient6}</span>
                    <Image
                      src={ingredientUrl.strIngredient6Pic.img}
                      alt='Ingredient image'
                      blurDataURL={ingredientUrl.strIngredient6Pic.base64}
                      placeholder='blur'
                      width={130}
                      height={130}
                      className='float-right'
                    />
                  </td>
                )}
                {drink.strMeasure6 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                    {drink.strMeasure6}
                  </td>
                )}
              </tr>
              <tr>
                {drink.strIngredient7 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                    <span>{drink.strIngredient7}</span>
                    <Image
                      src={ingredientUrl.strIngredient7Pic.img}
                      alt='Ingredient image'
                      blurDataURL={ingredientUrl.strIngredient7Pic.base64}
                      placeholder='blur'
                      width={130}
                      height={130}
                      className='float-right'
                    />
                  </td>
                )}
                {drink.strMeasure7 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                    {drink.strMeasure7}
                  </td>
                )}
              </tr>
              <tr>
                {drink.strIngredient8 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                    <span>{drink.strIngredient8}</span>
                    <Image
                      src={ingredientUrl.strIngredient8Pic.img}
                      alt='Ingredient image'
                      blurDataURL={ingredientUrl.strIngredient8Pic.base64}
                      placeholder='blur'
                      width={130}
                      height={130}
                      className='float-right'
                    />
                  </td>
                )}
                {drink.strMeasure8 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                    {drink.strMeasure8}
                  </td>
                )}
              </tr>
              <tr>
                {drink.strIngredient9 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                    <span>{drink.strIngredient9}</span>
                    <Image
                      src={ingredientUrl.strIngredient9Pic.img}
                      alt='Ingredient image'
                      blurDataURL={ingredientUrl.strIngredient9Pic.base64}
                      placeholder='blur'
                      width={130}
                      height={130}
                      className='float-right'
                    />
                  </td>
                )}
                {drink.strMeasure9 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                    {drink.strMeasure9}
                  </td>
                )}
              </tr>
              <tr>
                {drink.strIngredient10 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                    <span>{drink.strIngredient10}</span>
                    <Image
                      src={ingredientUrl.strIngredient10Pic.img}
                      alt='Ingredient image'
                      blurDataURL={ingredientUrl.strIngredient10Pic.base64}
                      placeholder='blur'
                      width={130}
                      height={130}
                      className='float-right'
                    />
                  </td>
                )}
                {drink.strMeasure10 && (
                  <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap align-top'>
                    {drink.strMeasure10}
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          <Collapse
            className='mt-4'
            defaultActiveKey={engInstructionsCollapseKey}
          >
            <Panel
              header='Preparation instructions'
              key={engInstructionsCollapseKey}
            >
              <p>{drink.strInstructions}</p>
            </Panel>
            {drink.strInstructionsES && (
              <Panel header='Instrucciones de preparación' key={uuidv4()}>
                <p>{drink.strInstructionsES}</p>
              </Panel>
            )}
          </Collapse>
        </Card>
      </div>
    </ApplicationWrapper>
  );
};

export default CocktailByNameById;
