import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";

export enum QuestStatus {
  RESTING = "resting",
  LOADING = "loading",
  ON_MISSION = "on-mission",
}

interface IMagicMover extends Document {
  weightLimit: number;
  questState: QuestStatus;
  count?: number;
}

const MagicMoverSchema: Schema<IMagicMover> = new Schema(
  {
    weightLimit: { type: Number, required: true },
    questState: { type: String, enum: QuestStatus, required: true },
    count: { type: Number, default: 0, required: false },
  },
  { timestamps: true, versionKey: false }
);

const MagicMoverModel: Model<IMagicMover> = mongoose.model<IMagicMover>(
  "MagicMover",
  MagicMoverSchema
);
export { IMagicMover, MagicMoverModel };
