import { Schema, model } from "mongoose";

const albumSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    }
);

const Album = model("Album", albumSchema);

export default Album;
