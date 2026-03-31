import express from "express"
const router = express.Router()
import Comment from "../models/Comment.model.js"


// create comment
router.post("/photo/:photoId/comment", async (req, res, next)=> {
  try {

    const commentData = { 
      content: req.body.content, 
      user: req.params.userId,
      photo: req.params.photoId

    };
    const newComment= await Comment.create(commentData)
    res.status(201).json(newComment)
  } catch (err) {
    next(err);
  }
}
)


//get comments
//photo/69c7ef6f8b369f0a5ad48ae8/comment
router.get("/photo/:photoId/comment", async (req, res, next) => {
try {
    const comments = await Comment.find({photo: req.params.photoId})
    .populate("user", "username profileImage")
    res.status(200).json(comments)
} catch (error) {
    console.log(error) 
    next(error)

}
})


export default router