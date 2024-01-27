import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { MandalaChartModel } from '../models/MandalaChart.model'
import { MyContext } from '../types/common'
import { MandalaChart } from '../types/mandalaChart'
import { isMandalaChartInputValid } from '../utils/mandalaChart'
import {
  CreateMandalaChartFailureType,
  CreateMandalaChartInput,
  CreateMandalaChartResponse,
  DeleteMandalaChartFailureType,
  DeleteMandalaChartInput,
  DeleteMandalaChartResponse,
  GetMandalaChartFailureType,
  GetMandalaChartInput,
  GetMandalaChartResponse,
  GetUserMandalaChartsInput,
  GetUserMandalaChartsResponse,
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

  @Query(() => GetUserMandalaChartsResponse)
  async getUserMandalaCharts(
    @Ctx() ctx: MyContext,
    @Arg('input') input: GetUserMandalaChartsInput
  ): Promise<typeof GetUserMandalaChartsResponse> {
    const { userId } = input
    // @ts-ignore
    const requestUserId: string | null = ctx.req.userId

    const mandalaCharts = await MandalaChartModel.find({ userId })
    const filteredManadalaCharts = mandalaCharts.filter(mandalaChart =>
      mandalaChart.userId.toString() === requestUserId
        ? true
        : !mandalaChart.private
    )

    return {
      mandalaCharts: filteredManadalaCharts.map(
        mandalaChart => mandalaChart.toJSON() as MandalaChart
      ),
    }
  }

  @Mutation(() => CreateMandalaChartResponse)
  async createMandalaChart(
    @Arg('input') input: CreateMandalaChartInput,
    @Ctx() ctx: MyContext
  ): Promise<typeof CreateMandalaChartResponse> {
    // @ts-ignore
    const userId: string | null = ctx.req.userId
    if (!userId) {
      return { errorType: CreateMandalaChartFailureType.UNAUTHORIZED_ACCESS }
    }
    if (!input.title) {
      return { errorType: CreateMandalaChartFailureType.NO_TITLE }
    }
    if (!isMandalaChartInputValid(input.centerCell, input.surroundingCells)) {
      return { errorType: CreateMandalaChartFailureType.INVALID_INPUT }
    }
    const mandalaChart = await MandalaChartModel.create({ ...input, userId })
    return { _id: mandalaChart._id }
  }

  @Mutation(() => UpdateMandalaChartResponse)
  async updateMandalaChart(
    @Arg('input') input: UpdateMandalaChartInput,
    @Ctx() ctx: MyContext
  ): Promise<typeof UpdateMandalaChartResponse> {
    // @ts-ignore
    const userId: string | null = ctx.req.userId

    if (!input.title) {
      return { errorType: UpdateMandalaChartFailureType.NO_TITLE }
    }
    if (!isMandalaChartInputValid(input.centerCell, input.surroundingCells)) {
      return { errorType: UpdateMandalaChartFailureType.INVALID_INPUT }
    }
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
    @Ctx() ctx: MyContext
  ): Promise<typeof DeleteMandalaChartResponse> {
    // @ts-ignore
    const userId: string | null = ctx.req.userId
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
