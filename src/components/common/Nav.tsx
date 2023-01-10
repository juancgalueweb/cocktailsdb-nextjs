import { AutoComplete } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import ingredients from '../../json/list-all-ingredients.json';

export const Nav: FC = () => {
  const router = useRouter();
  const options = ingredients.map((ele) => {
    return { label: ele.strIngredient1, value: ele.strIngredient1 };
  });
  const optionsInOrder = options.sort((a, b) => {
    let aString = a.label.toLowerCase();
    let bString = b.label.toLowerCase();
    if (aString < bString) return -1;
    if (aString > bString) return 1;
    return 0;
  });

  const onSelect = (value: string) => {
    router.push(`/search-results?ingredient=${value}&page=${1}`);
  };

  return (
    <nav className='w-full flex p-2 pl-4 items-center text-xl justify-between'>
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
      <div>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: 300 }}
          placeholder='Search cocktail by ingredient'
          options={optionsInOrder}
          filterOption={true}
          onSelect={onSelect}
          notFoundContent='Ingredient not found'
        ></AutoComplete>
      </div>
    </nav>
  );
};
