import mongoose from "mongoose";

import { Schema, Document, Model } from "mongoose";

interface IMagicItem extends Document {
  name: string;
  weight: number;
  magicMoverId: string;
}

const MagicItemSchema: Schema<IMagicItem> = new Schema(
  {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    magicMoverId: { type: mongoose.Types.ObjectId, ref: "MagicMover" },
  },
  { timestamps: true, versionKey: false }
);

const MagicItemModel: Model<IMagicItem> = mongoose.model<IMagicItem>(
  "MagicItem",
  MagicItemSchema
);
export { IMagicItem, MagicItemModel };
