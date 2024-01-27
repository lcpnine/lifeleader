import mongoose, { Document, Schema } from 'mongoose'

// MandalaCell schema remains the same
const MandalaCellSchema: Schema = new Schema({
  goal: { type: String },
  tasks: [{ type: String }],
})

export interface IMandalaCell extends Document {
  goal: string
  tasks: string[]
}

const MandalaChartSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  private: { type: Boolean, default: false },
  centerCell: MandalaCellSchema,
  createdAt: { type: Date, default: Date.now },
  lastModifiedAt: { type: Date, default: Date.now },
  surroundingCells: [MandalaCellSchema],
})

export interface IMandalaChart extends Document {
  title: string
  description?: string
  userId: mongoose.Types.ObjectId
  private: boolean
  centerCell: IMandalaCell
  createdAt: Date
  lastModifiedAt: Date
  surroundingCells: IMandalaCell[]
}

export const MandalaChartModel = mongoose.model<IMandalaChart>(
  'MandalaChart',
  MandalaChartSchema
)
