export interface RecommendationItemProps {
  id: number
  text: string
  isClicked: boolean
}

interface Props {
  item: RecommendationItemProps
  onClickItem: () => void
}

const RecommendationItem = ({ item, onClickItem }: Props) => {
  return (
    <div
      className={`rounded border p-2 cursor-pointer ${
        item.isClicked
          ? 'bg-blue-500 text-white line-clamp-none'
          : 'hover:bg-gray-100 line-clamp-1'
      }`}
      onClick={onClickItem}
    >
      {item.text}
    </div>
  )
}

export default RecommendationItem
