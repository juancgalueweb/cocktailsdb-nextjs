import { AutoComplete, Input, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import ingredientsJSON from '../../json/list-all-ingredients.json';
import cocktailsNamesJSON from '../../json/list-all-cocktails-by-name.json';
import { fetchCocktailsbyName } from '../../pages/api/getCocktailByName';

export const Nav: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  //Ingredients
  const ingredients = ingredientsJSON.map((ele) => {
    return { label: ele.strIngredient1, value: ele.strIngredient1 };
  });
  const ingredientsInOrder = ingredients.sort((a, b) => {
    let aString = a.label.toLowerCase();
    let bString = b.label.toLowerCase();
    if (aString < bString) return -1;
    if (aString > bString) return 1;
    return 0;
  });
  const onSelectIngredient = (value: string) => {
    router.push(`/search-results-ingredient?ingredient=${value}&page=${1}`);
  };

  //Cocktails by name

  const allCocktails = cocktailsNamesJSON.map((cocktail) => {
    return { label: cocktail.strDrink, value: cocktail.strDrink };
  });
  const allCocktailsInOrder = allCocktails.sort((a, b) => {
    let aString = a.label.toLowerCase();
    let bString = b.label.toLowerCase();
    if (aString < bString) return -1;
    if (aString > bString) return 1;
    return 0;
  });
  const onSelectCocktail = (value: string) => {
    router.push(`/search-results-by-name?name=${value}&page=${1}`);
  };

  const onSearch = async (value: string) => {
    if ((await fetchCocktailsbyName(value)) === null) {
      messageApi.open({
        type: 'error',
        content: 'Cocktail does not exist in the database',
      });
    } else {
      router.push(`/search-results-by-name?name=${value}&page=${1}`);
    }
  };

  return (
    <nav className='w-full flex p-2 pl-4 items-center text-xl justify-between'>
      {contextHolder}
      <div>
        <Link
          href='/'
          className='mr-4 transition duration-500 border-b-2 border-transparent hover:border-blue-600 hover:text-gray-800'
        >
          Home
        </Link>
        <Link
          href='/popular-cocktails'
          className='mx-4 transition duration-500 border-b-2 border-transparent hover:border-purple-500 hover:text-gray-800'
        >
          Pupular Cocktails
        </Link>
        <Link
          href='/latest-cocktails'
          className='mx-4 transition duration-500 border-b-2 border-transparent hover:border-amber-500 hover:text-gray-800'
        >
          Latest Cocktails
        </Link>
      </div>
      <div className='flex items-center'>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: 250 }}
          options={allCocktailsInOrder}
          filterOption={true}
          onSelect={onSelectCocktail}
          className='mr-4'
        >
          <Input.Search
            placeholder='Search cocktails by name'
            onSearch={onSearch}
          />
        </AutoComplete>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: 300 }}
          placeholder='Search cocktails by ingredient'
          options={ingredientsInOrder}
          filterOption={true}
          onSelect={onSelectIngredient}
          notFoundContent='Ingredient not found'
          allowClear
        ></AutoComplete>
      </div>
    </nav>
  );
};
