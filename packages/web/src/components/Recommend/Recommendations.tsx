import { useState } from 'react'
import RecommendationItem, {
  RecommendationItemProps,
} from './RecommendationItem'

export interface Props {
  items: { text: string }[]
}
const Recommendations = ({ items }: Props) => {
  const [recommendationItems, setRecommendationItems] = useState<
    RecommendationItemProps[]
  >(
    items.map((item, idx) => ({
      id: idx,
      text: item.text,
      isClicked: false,
    }))
  )

  const handleItemClick = (id: number) => () => {
    const previousClickedItem = recommendationItems.find(item => item.isClicked)
    const updatedItems = recommendationItems.map(item => ({
      ...item,
      isClicked: item.id === id ? !item.isClicked : false,
    }))
    if (previousClickedItem?.isClicked) {
      updatedItems[previousClickedItem.id].isClicked = false
    }
    setRecommendationItems(updatedItems)
  }

  return (
    <div className="fixed bottom-10 left-10 right-10 bg-white shadow-lg p-4 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendationItems.map(item => (
          <RecommendationItem
            key={item.id}
            item={item}
            onClickItem={handleItemClick(item.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Recommendations
