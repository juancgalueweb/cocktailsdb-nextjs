import { AutoComplete, Button, Modal } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ingredientsJSON from '../../json/list-all-ingredients.json'

const SearchByIngredientModal: React.FC = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  //Ingredients
  const ingredients = ingredientsJSON.map(ele => {
    return { label: ele.strIngredient1, value: ele.strIngredient1 }
  })
  const ingredientsInOrder = ingredients.sort((a, b) => {
    const aString = a.label.toLowerCase()
    const bString = b.label.toLowerCase()
    if (aString < bString) return -1
    if (aString > bString) return 1
    return 0
  })
  const onSelectIngredient = (value: string) => {
    router.push(`/search-results-ingredient?ingredient=${value}&page=${1}`)
    setIsModalOpen(false)
  }

  return (
    <>
      <a onClick={showModal}>Search cocktail by ingredient</a>
      <Modal
        title='Search cocktails by their main ingredient'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            type='default'
            onClick={handleCancel}
            key='cancel-search-by-ingredient'
          >
            Cancel
          </Button>
        ]}
      >
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: '100%' }}
          placeholder='Search cocktails by ingredient'
          options={ingredientsInOrder}
          filterOption={true}
          onSelect={onSelectIngredient}
          notFoundContent='Ingredient not found'
          allowClear
        ></AutoComplete>
      </Modal>
    </>
  )
}

export default SearchByIngredientModal
