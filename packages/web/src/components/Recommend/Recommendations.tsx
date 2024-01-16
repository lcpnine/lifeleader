import { FaRedo } from 'react-icons/fa'
import RecommendationItem, {
  RecommendationItemProps,
} from './RecommendationItem'

interface Props {
  recommendationItems: RecommendationItemProps[]
  handleRecommendationItemClick: (id: number) => () => void
  handleRefresh: () => void
}

const Recommendations = ({
  recommendationItems,
  handleRecommendationItemClick,
  handleRefresh,
}: Props) => {
  return (
    <div className="fixed bottom-10 left-10 right-10 bg-white shadow-lg p-4 rounded-lg">
      <div className="text-center">
        <button
          onClick={handleRefresh}
          className="p-2 rounded hover:bg-gray-200 inline-flex items-center justify-center mb-4"
        >
          <span>Refresh</span>
          <FaRedo className="ml-2" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendationItems.map(item => (
          <RecommendationItem
            key={item.id}
            item={item}
            onClickItem={handleRecommendationItemClick(item.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Recommendations
