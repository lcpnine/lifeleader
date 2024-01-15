export interface RecommendationItem {
  id: number
  text: string
}

export interface Props {
  items: RecommendationItem[]
}

const Recommendations = ({ items }: Props) => {
  return (
    <div className="fixed bottom-10 left-10 right-10 bg-white shadow-lg p-4 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => (
          <div
            key={item.id}
            className="truncate rounded border p-2 hover:bg-gray-100"
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recommendations
