import { AutoComplete, Button, Input, message, Modal } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import cocktailsNamesJSON from '../../json/list-all-cocktails-by-name.json'
import { fetchCocktailsbyName } from '../../pages/api/getCocktailByName'

const SearchByNameModal: React.FC = () => {
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  //Cocktails by name
  const allCocktails = cocktailsNamesJSON.map(cocktail => {
    return { label: cocktail.strDrink, value: cocktail.strDrink }
  })
  const allCocktailsInOrder = allCocktails.sort((a, b) => {
    const aString = a.label.toLowerCase()
    const bString = b.label.toLowerCase()
    if (aString < bString) return -1
    if (aString > bString) return 1
    return 0
  })
  const onSelectCocktail = (value: string) => {
    router.push(`/search-results-by-name?name=${value}&page=${1}`)
    setIsModalOpen(false)
  }

  const onSearch = async (value: string) => {
    if ((await fetchCocktailsbyName(value)) === null) {
      messageApi.open({
        type: 'error',
        content: 'Cocktail does not exist in the database'
      })
    } else {
      router.push(`/search-results-by-name?name=${value}&page=${1}`)
      setIsModalOpen(false)
    }
  }

  return (
    <>
      {contextHolder}
      <a onClick={showModal}>Search cocktail by name</a>
      <Modal
        title='Search cocktails by their name'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            type='default'
            onClick={handleCancel}
            key='cancel-search-by-name'
          >
            Cancel
          </Button>
        ]}
      >
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: '100%' }}
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
      </Modal>
    </>
  )
}

export default SearchByNameModal
