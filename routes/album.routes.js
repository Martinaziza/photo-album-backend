import express from "express"
const router = express.Router()
import Album from "../models/Album.model.js";
import isAuthenticated from "../middleware/jwt.middleware.js";

// create an album
router.post("/users/:userId/album", async (req, res, next)=> {
  try {

    const albumData = { 
      ...req.body, 
      user: req.params.userId 
    };
    const newAlbum= await Album.create(albumData)
    res.status(201).json(newAlbum)
  } catch (err) {
    next(err);
  }
}
)

//fetch all albums by one user
router.get("/users/:userId/album", async (req, res, next) => {
    try {
        // const { id } = req.params
        //{user: id}
    const allAlbums = await Album.find().populate("user", "username")
    res.status(200).json(allAlbums)
    } catch (error) {
       console.log(error) 
    }
})


// fetch one album by Id
router.get("/album/:albumId", async (req, res, next) => {
try {
    const oneAlbum = await Album.findById(req.params.albumId).populate("user", "username")
    res.status(200).json(oneAlbum)
} catch (error) {
    console.log(error) 
    next(error)

}
})

//edit album by id
router.put("/album/:albumId", async (req, res, next) => {
try {
    const updatedAlbum = await Album.findByIdAndUpdate(req.params.albumId, req.body, {new: true})
    res.status(200).json(updatedAlbum)
} catch (error) {
    console.log(error) 
    next(error)
}
})


//delete album by id
router.delete("/album/:albumId", async (req, res, next) => {
try {
    const album = await Album.findByIdAndDelete(req.params.albumId)
    res.status(200).json(album)
} catch (error) {
    console.log(error) 
    next(error)
}
})





export default router




// get single photo
// update photo info
// delete photo
// create + get commemts
// patch profile pic

