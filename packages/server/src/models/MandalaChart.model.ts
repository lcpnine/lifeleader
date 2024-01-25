import mongoose, { Document, Schema } from 'mongoose'

const MandalaCellSchema: Schema = new Schema({
  goal: { type: String },
  tasks: [{ type: String }],
})

export interface IMandalaCell extends Document {
  goal: string
  tasks: string[]
}

const MandalaCell = mongoose.model<IMandalaCell>(
  'MandalaCell',
  MandalaCellSchema
)

const MandalaChartSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  private: { type: Boolean, default: false },
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
  title: string
  description?: string
  userId: mongoose.Types.ObjectId
  private: boolean
  centerCell: mongoose.Types.ObjectId
  surroundingCells: mongoose.Types.ObjectId[]
}

export const MandalaChartModel = mongoose.model<IMandalaChart>(
  'MandalaChart',
  MandalaChartSchema
)
