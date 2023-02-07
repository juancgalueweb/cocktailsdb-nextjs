import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowLeftLong,
  faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Collapse, Tag } from 'antd'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getPlaiceholder } from 'plaiceholder'
import { ApplicationWrapper } from '../../components/layout/ApplicationWrapper'
import { getIngredientsFromCocktail } from '../../helpers/cocktailIngredients'
import { imageCreditsName } from '../../helpers/imageCreditsName'
import { imageCreditsUrl } from '../../helpers/imageCreditsUrl'
import { CocktailApiResponse } from '../../interfaces/CocktailApiResponse'
import { Ingredients } from '../../interfaces/Ingredients'
import { fetchCocktailById } from '../api/getCocktailById'
import { fetchLatestCocktails } from '../api/getLatestCocktails'

const { Panel } = Collapse
interface TProps {
  drink: CocktailApiResponse
  nextId: number
  prevId: number
  hasNextId: boolean
  hasPrevId: boolean
  allIds: string[]
  ingredientUrl: Ingredients
}

export const getStaticPaths: GetStaticPaths = async () => {
  const drinks = await fetchLatestCocktails()
  const paths = drinks?.map((drink: CocktailApiResponse) => {
    return {
      params: { idDrink: drink.idDrink },
    }
  })
  return { paths: paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.idDrink as string
  // Get all drinks to build a list with all the ids
  const allDrinks = await fetchLatestCocktails()
  const allIds = allDrinks?.map((drink: CocktailApiResponse) => drink.idDrink)
  const nextId: number = allIds.indexOf(id) + 1
  const prevId: number = allIds.indexOf(id) - 1
  const hasNextId: boolean = allIds.includes(allIds[nextId])
  const hasPrevId: boolean = allIds.includes(allIds[prevId])
  // Get a single drink by its id
  const singleDrink = await fetchCocktailById(id)
  const ingredientUrl = await getIngredientsFromCocktail(singleDrink)
  const { base64, img } = await getPlaiceholder(singleDrink.strDrinkThumb)
  const drink = { ...singleDrink, base64, img }

  return {
    props: {
      drink,
      nextId,
      prevId,
      hasNextId,
      hasPrevId,
      allIds,
      ingredientUrl,
    },
  }
}

const PopularCocktailDetailPage: NextPage<TProps> = ({
  drink,
  nextId,
  prevId,
  hasNextId,
  hasPrevId,
  allIds,
  ingredientUrl,
}) => {
  const router = useRouter()

  return (
    <ApplicationWrapper title={drink.strDrink}>
      <div
        key={drink.idDrink}
        className='min-h-screen flex flex-col justify-center items-center bg-slate-200'
      >
        <h1 className='text-4xl py-3 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-zinc-800 to-zinc-600'>
          {drink.strDrink}
        </h1>
        <div className='md:w-3/5 lg:w-1/2 xl:w-1/3 flex justify-between'>
          {hasPrevId ? (
            <Link
              href={`/latest-cocktails/${allIds[+prevId]}`}
              className='text-gray-600 text-lg font-medium mb-3 mr-5'
            >
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                className='mr-2 fa-beat'
                style={{ animationDuration: '2s' }}
              ></FontAwesomeIcon>{' '}
              Previous
            </Link>
          ) : (
            <span> </span>
          )}
          {hasNextId && (
            <Link
              href={`/latest-cocktails/${allIds[+nextId]}`}
              className='text-gray-600 text-lg font-medium mb-3 ml-5'
            >
              Next{' '}
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className='ml-2 fa-beat'
                style={{ animationDuration: '2s' }}
              ></FontAwesomeIcon>
            </Link>
          )}
        </div>
        <Card
          hoverable
          className='mb-6 cursor-default md:max-w-[600px] lg:min-w-[600px] xl:min-w-[600px]'
          cover={
            <div className='flex justify-center mt-2'>
              <Image
                src={drink?.img}
                alt={`${drink.strDrink} Image`}
                width={500}
                height={500}
                blurDataURL={drink?.base64}
                placeholder='blur'
                style={{ borderRadius: '4px', margin: '0 auto' }}
              />
            </div>
          }
          extra={
            <Button
              type='default'
              danger
              className='my-3'
              onClick={() => router.push('/latest-cocktails')}
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
          {drink.strTags?.split(',').map((ele, idx) => (
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
          <Collapse className='mt-4' defaultActiveKey='english-instructions'>
            <Panel header='Preparation instructions' key='english-instructions'>
              <p>{drink.strInstructions}</p>
            </Panel>
            {drink.strInstructionsES && (
              <Panel
                header='Instrucciones de preparación'
                key='spanish-instructions'
              >
                <p>{drink.strInstructionsES}</p>
              </Panel>
            )}
          </Collapse>
        </Card>
      </div>
    </ApplicationWrapper>
  )
}

export default PopularCocktailDetailPage
