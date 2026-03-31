import express from "express"
const router = express.Router()

import Photo from "../models/Photo.model.js"
import User from "../models/User.model.js";


//add multiple photos at once
router.post("/album/:albumId/photo", async (req, res, next) => {
  try {
    const { newPhotos } = req.body; // Expects an array of strings: ["url1", "url2"]
    // Turns the strings into objects with the albumId
    const photosToInsert = newPhotos.map((url) => {
      return {
        imageUrl: url,
        album: req.params.albumId,
        user: req.params.userId
      }
    });

    const createdPhotos = await Photo.insertMany(photosToInsert);

    res.status(201).json(createdPhotos);
  } catch (error) {
    next(error);
  }
});

//get photos
// album/69c2fa64db231374880e45a6/photo (aragorn)
//api/album/69cbf7e24940917b3fdd22df/photo (gimli)
router.get("/album/:albumId/photo", async (req, res, next) => {
    try {
    const allPhotos = await Photo.find({ album: req.params.albumId })
  // .populate("user", "username")
    res.status(200).json(allPhotos)
    } catch (error) {
       console.log(error) 
       next(error)
    }
})

// get one photo
//album/69c2fa64db231374880e45a6/photo/69c7ef6f8b369f0a5ad48ae8
// 
router.get("/album/:albumId/photo/:photoId", async (req, res, next) => {
try {
    const onePhoto = await Photo.findById(req.params.photoId).populate("user", "username").populate("album", "title")
    res.status(200).json(onePhoto)
} catch (error) {
    console.log(error) 
    next(error)

}
})


//edit one photo
//api/album/69cbf7e24940917b3fdd22df/photo/69cbfbf4257d65a386913798 (gimli flowers)
router.patch("/album/:albumId/photo/:photoId", async (req, res, next) => {
try {
    const updatedPhoto = await Photo.findByIdAndUpdate(req.params.photoId, {caption: req.body.caption}, {new: true})
    res.status(200).json(updatedPhoto)
} catch (error) {
    console.log(error) 
    next(error)
}
})



// delete one photo
router.delete("/album/:albumId/photo/:photoId", async (req, res, next) => {
try {
    const photo = await Photo.findByIdAndDelete(req.params.photoId)
    res.status(200).json(photo)
} catch (error) {
    console.log(error) 
    next(error)
}
})



export default router
