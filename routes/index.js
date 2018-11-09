const express = require('express');
const cloudinary = require('cloudinary');
const Movie = require('../models/movie.js')
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  Movie.find()
  .then((movies) => {
    res.render('index', { movies });
  })
  .catch((error) => {
    console.log(error)
  })

  let img = cloudinary.image("http://res.cloudinary.com/ironhack/image/upload/v1541754423/carrot/Star-Wars-9-will-correct-Rey-Luke-and-Kylo-Ren-storylines-1041757.jpg.jpg", {effect: "grayscale"})
  console.log('DEBUG img', img);
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add')
});

// uploadCloud.single('photo') is a middleware
// the parameter is 'photo' because we have 
// --->  <input type="file" name="photo">
router.post('/movie/add', uploadCloud.single('photo'), (req, res, next) => {



  const newMovie = new Movie({
    title: req.body.title, 
    description: req.body.description, 
    imgPath: req.file.url, 
    imgName: req.file.originalname,
  })
  newMovie.save()
  .then(movie => {
    res.redirect('/')
  })
  .catch(error => {
    console.log(error)
  })
});

module.exports = router;