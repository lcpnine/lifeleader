import mongoose, { Document, Schema } from 'mongoose'

// MandalaCell Schema
const MandalaCellSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  goals: [{ type: String }],
  tasks: [{ type: String }],
})

export interface IMandalaCell extends Document {
  title: string
  description?: string
  goals: string[]
  tasks: string[]
}

const MandalaCell = mongoose.model<IMandalaCell>(
  'MandalaCell',
  MandalaCellSchema
)

const MandalaChartSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  centerCell: {
    type: Schema.Types.ObjectId,
    ref: MandalaCell.name,
    required: true,
  },
  surroundingCells: [
    { type: Schema.Types.ObjectId, ref: MandalaCell.name, required: true },
  ],
})

export interface IMandalaChart extends Document {
  userId: mongoose.Types.ObjectId
  centerCell: mongoose.Types.ObjectId
  surroundingCells: mongoose.Types.ObjectId[]
}

const MandalaChart = mongoose.model<IMandalaChart>(
  'MandalaChart',
  MandalaChartSchema
)

export default MandalaChart
