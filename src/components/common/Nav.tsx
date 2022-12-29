import { AutoComplete, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import ingredients from '../../json/list-all-ingredients.json';

export const Nav: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
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
    router.push(`/search-results?ingredient=${value}`);
    messageApi.open({
      type: 'loading',
      content: 'Searching for the cocktails...',
      duration: 0,
    });
    // Dismiss manually and asynchronously
    setTimeout(messageApi.destroy, 1000);
  };

  return (
    <>
      {contextHolder}
      <nav className='w-full flex p-2 pl-4 items-center text-xl justify-between'>
        <div>
          <Link href='/' className='mr-4'>
            Home
          </Link>
          <Link href='/popular-cocktails' className='ml-4'>
            Pupular Cocktails
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
    </>
  );
};
