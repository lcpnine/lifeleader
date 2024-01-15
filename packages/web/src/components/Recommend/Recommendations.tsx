import RecommendationItem, {
  RecommendationItemProps,
} from './RecommendationItem'

export interface Props {
  recommendationItems: RecommendationItemProps[]
  handleRecommendationItemClick: (id: number) => () => void
}
const Recommendations = ({
  recommendationItems,
  handleRecommendationItemClick,
}: Props) => {
  return (
    <div className="fixed bottom-10 left-10 right-10 bg-white shadow-lg p-4 rounded-lg">
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
