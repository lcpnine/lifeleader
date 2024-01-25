import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import UserId from '../decorators/userId'
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
    @Arg('input') input: UpdateMandalaChartInput,
    @UserId() userId: string
  ): Promise<typeof UpdateMandalaChartResponse> {
    const candidateChart = await MandalaChartModel.findById(
      input.mandalaChartId
    )
    if (!candidateChart) {
      return { errorType: UpdateMandalaChartFailureType.CHART_NOT_FOUND }
    }
    if (candidateChart.userId.toString() !== userId) {
      return { errorType: UpdateMandalaChartFailureType.UNAUTHORIZED_ACCESS }
    }

    const updatedChart = (await MandalaChartModel.findByIdAndUpdate(
      input.mandalaChartId,
      input,
      { new: true }
    )) as MandalaChart

    return { _id: updatedChart._id }
  }

  @Mutation(() => DeleteMandalaChartResponse)
  async deleteMandalaChart(
    @Arg('input') input: DeleteMandalaChartInput,
    @UserId() userId: string
  ): Promise<typeof DeleteMandalaChartResponse> {
    const candidateChart = await MandalaChartModel.findById(
      input.mandalaChartId
    )
    if (!candidateChart) {
      return { errorType: DeleteMandalaChartFailureType.CHART_NOT_FOUND }
    }
    if (candidateChart.userId.toString() !== userId) {
      return { errorType: DeleteMandalaChartFailureType.UNAUTHORIZED_ACCESS }
    }

    const deletedChart = (await MandalaChartModel.findByIdAndDelete(
      input.mandalaChartId
    )) as MandalaChart
    return { _id: deletedChart._id }
  }
}
