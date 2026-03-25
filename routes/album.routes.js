import express from "express"
const router = express.Router()
import Album from "../models/Album.model.js";
import Photo from "../models/Photo.model.js";
import isAuthenticated from "../middleware/jwt.middleware.js";


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

router.get("/users/:userId/album", async (req, res, next) => {
    try {
    const allAlbums = await Album.find().populate("user", "username")
    res.status(200).json(allAlbums)
    } catch (error) {
       console.log(error) 
    }
})

router.get("/album/:albumId", async (req, res, next) => {
try {
    const oneAlbum = await Album.findById(req.params.albumId).populate("user", "username")
    res.status(200).json(oneAlbum)
} catch (error) {
    console.log(error) 
    next(error)

}
})

router.put("/album/:albumId", async (req, res, next) => {
try {
    const updatedAlbum = await Album.findByIdAndUpdate(req.params.albumId, req.body, {new: true})
    res.status(200).json(updatedAlbum)
} catch (error) {
    console.log(error) 
    next(error)
}
})


router.delete("/album/:albumId", async (req, res, next) => {
try {
    const album = await Album.findByIdAndDelete(req.params.albumId)
    res.status(200).json(album)
} catch (error) {
    console.log(error) 
    next(error)
}
})


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


// router.get("/album/:albumId/photo/:photoId", async (req, res, next) => {
// try {
//     const onePhoto = await Photo.findById(req.params.albumId).populate("user", "username").populate("album", "title")
//     res.status(200).json(onePhoto)
// } catch (error) {
//     console.log(error) 
//     next(error)

// }
// })

// router.put("/album/:albumId", async (req, res, next) => {
// try {
//     const updatedAlbum = await Album.findByIdAndUpdate(req.params.albumId, req.body, {new: true})
//     res.status(200).json(updatedAlbum)
// } catch (error) {
//     console.log(error) 
//     next(error)
// }
// })


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




// get single photo
// update photo info
// delete photo
// create + get commemts
// patch profile pic

