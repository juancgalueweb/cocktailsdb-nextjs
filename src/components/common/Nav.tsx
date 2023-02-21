import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { FaCocktail } from 'react-icons/fa'
import SearchByIngredientModal from '../Modals/SearchByIngredient'
import SearchByNameModal from '../Modals/SearchByName'

export const Nav: FC = () => {
  const router = useRouter()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <SearchByNameModal />
    },
    {
      key: '2',
      label: <SearchByIngredientModal />
    }
  ]

  const activeLinkClassName =
    'py-0.5 px-1 rounded bg-gray-700 text-white hover:shadow-slate-600'
  const homeClassName =
    'ml-2 transition duration-500 border-b-2 border-transparent hover:border-gray-800 hover:text-gray-800'
  const restOfLinksClassName =
    'transition duration-500 border-b-2 border-transparent hover:border-gray-800 hover:text-gray-800'

  return (
    <nav className='w-full p-2 text-sm md:text-xl flex justify-start items-center gap-x-2 md:gap-x-5'>
      <Link
        href='/'
        className={
          router.pathname === '/' ? activeLinkClassName : homeClassName
        }
      >
        Home
      </Link>
      <Link
        href='/popular-cocktails'
        className={
          router.pathname === '/popular-cocktails'
            ? activeLinkClassName
            : restOfLinksClassName
        }
      >
        Popular <FaCocktail className='inline text-teal-400 mb-1 mx-1' />
      </Link>
      <Link
        href='/latest-cocktails'
        className={
          router.pathname === '/latest-cocktails'
            ? activeLinkClassName
            : restOfLinksClassName
        }
      >
        Latest <FaCocktail className='inline text-teal-400 mb-1 mx-1' />
      </Link>
      <Dropdown menu={{ items }}>
        <a
          onClick={e => e.preventDefault()}
          className='transition duration-500 border-b-2 border-transparent hover:border-gray-800 hover:text-gray-800'
        >
          <Space className='text-sm md:text-xl'>
            More drinks
            <div className='flex content-center gap-1'>
              <QuestionCircleOutlined className='bg-red-600 text-slate-200 rounded-2xl' />
              <DownOutlined className='inline' />
            </div>
          </Space>
        </a>
      </Dropdown>
    </nav>
  )
}
