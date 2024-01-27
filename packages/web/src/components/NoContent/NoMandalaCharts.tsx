import useGoTo from '@/hooks/useGoTo'
import { InboxIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

const NoMandalaCharts = () => {
  const { goTo } = useGoTo()

  return (
    <div className="text-center mt-10">
      <InboxIcon className="mx-auto h-36 w-36 text-gray-400" />
      <h3 className="mt-2 text-xl font-bold text-gray-900">
        No Mandala Charts Found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating your first Mandala chart.
      </p>
      <div
        className="flex justify-center items-center text-gray-900 hover:text-blue-700 hover:cursor-pointer font-bold py-4 px-2 text-l"
        onClick={() => goTo('/create-mandala-chart')}
      >
        <PlusCircleIcon className="h-5 w-5 mr-1" />
        Create Mandala Chart
      </div>
    </div>
  )
}

export default NoMandalaCharts
