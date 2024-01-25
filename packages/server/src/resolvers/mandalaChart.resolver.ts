import { Arg, Query, Resolver } from 'type-graphql'
import { IMandalaChart, MandalaChartModel } from '../models/MandalaChart.model'
import { MandalaChart } from '../types/mandalaChart'

@Resolver()
export class MandalaChartResolver {
  @Query(() => MandalaChart, { nullable: true })
  async getMandalaChart(
    @Arg('_id') _id: string
  ): Promise<IMandalaChart | null> {
    return await MandalaChartModel.findById(_id)
  }
}
