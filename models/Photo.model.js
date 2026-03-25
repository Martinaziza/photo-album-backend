import { Schema, model } from "mongoose";

const photoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: "Album",
      trim: true
    },
    imageUrl: String,
    caption: {
      type: String, 
      default: ""},
    locationName: {
      type: String,
      default: ""}, 
    locationCoords: {
        lat: {
          type: Number, 
          default: null
        },
       lng: {
          type: Number, 
          default: null
        }
    }, 
    tags: {
      type: [String],
      default: []
  },
}
);

const Photo = model("Photo", photoSchema);

export default Photo;
