import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    photo: {
      type: Schema.Types.ObjectId,
      ref: "Photo",
    },
    content: String,
  },
 
);
const Comment = model("Comment", commentSchema);

export default Comment;