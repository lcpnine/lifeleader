import MandalaChart from '@/components/MandalaChart/MandalaChart'
import MandalaThemeSelector from '@/components/MandalaThemeSelector/MandalaThemeSelector'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center text-blue-600 my-4 shadow-lg">
        Mandala Chart
      </h1>

      <p className="text-center mb-6 max-w-prose">
        The <span className="font-bold">Mandala Chart</span> is a powerful tool
        for visualizing and achieving goals. It helps in organizing thoughts and
        actions towards a specific objective. A great example of goal
        achievement is the story of Shohei Ohtani, who has excelled in multiple
        facets of baseball through focused effort and determination.
      </p>
      <MandalaThemeSelector />
      <MandalaChart />
    </div>
  )
}

export default Home
