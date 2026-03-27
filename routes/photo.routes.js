import express from "express"
const router = express.Router()

import Photo from "../models/Photo.model.js"


//add multiple photos at once
router.post("/album/:albumId/photo", async (req, res, next) => {
  try {
    const { photo } = req.body; // Expects an array of strings: ["url1", "url2"]
    // Turns the strings into objects with the albumId
    const photosToInsert = photo.map((url) => {
      return {
        imageUrl: url,
        album: req.params.albumId,
    // user: req.payload
      }
    });

    const createdPhotos = await Photo.insertMany(photosToInsert);

    res.status(201).json(createdPhotos);
  } catch (error) {
    next(error);
  }
});

//get photos
router.get("/album/:albumId/photo", async (req, res, next) => {
    try {
    const allPhotos = await Photo.find({ album: req.params.albumId })
  .populate("user", "username")
  .populate("album", "title");
    res.status(200).json(allPhotos)
    } catch (error) {
       console.log(error) 
       next(error)
    }
})

// get one photo
// router.get("/album/:albumId/photo/:photoId", async (req, res, next) => {
// try {
//     const onePhoto = await Photo.findById(req.params.albumId).populate("user", "username").populate("album", "title")
//     res.status(200).json(onePhoto)
// } catch (error) {
//     console.log(error) 
//     next(error)

// }
// })


//edit one photo
// router.put("/album/:albumId", async (req, res, next) => {
// try {
//     const updatedAlbum = await Album.findByIdAndUpdate(req.params.albumId, req.body, {new: true})
//     res.status(200).json(updatedAlbum)
// } catch (error) {
//     console.log(error) 
//     next(error)
// }
// })



// delete one photo
// router.delete("/album/:albumId", async (req, res, next) => {
// try {
//     const album = await Album.findByIdAndDelete(req.params.albumId)
//     res.status(200).json(album)
// } catch (error) {
//     console.log(error) 
//     next(error)
// }
// })



export default router
