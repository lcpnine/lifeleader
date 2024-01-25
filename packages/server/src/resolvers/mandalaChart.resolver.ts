// server/src/resolvers/mandalaChart.resolver.ts
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { MandalaChartModel } from '../models/MandalaChart.model'
import { MandalaChart } from '../types/mandalaChart'
import {
  CreateMandalaChartInput,
  CreateMandalaChartResponse,
  DeleteMandalaChartFailureType,
  DeleteMandalaChartInput,
  DeleteMandalaChartResponse,
  GetMandalaChartFailureType,
  GetMandalaChartInput,
  GetMandalaChartResponse,
  UpdateMandalaChartFailureType,
  UpdateMandalaChartInput,
  UpdateMandalaChartResponse,
} from './dto/mandalaChart.dto'

@Resolver()
export class MandalaChartResolver {
  @Query(() => GetMandalaChartResponse)
  async getMandalaChart(
    @Arg('input') input: GetMandalaChartInput
  ): Promise<typeof GetMandalaChartResponse> {
    const mandalaChart = await MandalaChartModel.findById(input.mandalaChartId)
      .populate('centerCell')
      .populate('surroundingCells')

    if (!mandalaChart) {
      return { errorType: GetMandalaChartFailureType.CHART_NOT_FOUND }
    }

    return { mandalaChart: mandalaChart.toJSON() as MandalaChart }
  }

  @Mutation(() => CreateMandalaChartResponse)
  async createMandalaChart(
    @Arg('input') input: CreateMandalaChartInput
  ): Promise<typeof CreateMandalaChartResponse> {
    const mandalaChart = await MandalaChartModel.create(input)
    return { _id: mandalaChart._id }
  }

  @Mutation(() => UpdateMandalaChartResponse)
  async updateMandalaChart(
    @Arg('input') input: UpdateMandalaChartInput
  ): Promise<typeof UpdateMandalaChartResponse> {
    const updatedChart = await MandalaChartModel.findByIdAndUpdate(
      input.mandalaChartId,
      input,
      { new: true }
    )
    if (!updatedChart) {
      return { errorType: UpdateMandalaChartFailureType.CHART_NOT_FOUND }
    }
    return { _id: updatedChart._id }
  }

  @Mutation(() => DeleteMandalaChartResponse)
  async deleteMandalaChart(
    @Arg('input') input: DeleteMandalaChartInput
  ): Promise<typeof DeleteMandalaChartResponse> {
    const deletedChart = await MandalaChartModel.findByIdAndDelete(
      input.mandalaChartId
    )
    if (!deletedChart) {
      return { errorType: DeleteMandalaChartFailureType.CHART_NOT_FOUND }
    }
    return { _id: deletedChart._id }
  }
}
