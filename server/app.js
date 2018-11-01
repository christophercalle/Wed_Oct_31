const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const PORT = 3000
const bodyParser = require('body-parser')


app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({ extended: false }))

let movies = []
app.use(bodyParser.json())

app.get('/', function(req,res){
    res.render('index' , {movies : movies})
})


app.post('/', function(req, res){
    console.log(req.body)
    let title = req.body.title
    let description = req.body.description
    let genre = req.body.genre
    let postURL = req.body.postURL
    
    let newMovie = {title: title, description: description, genre: genre, postURL: postURL}
    movies.push(newMovie)
    res.redirect('/')
})



app.post('/remove-movie',function(req,res){

  let title  = req.body.title

  movies = movies.filter(function(movie){
    return movie.title != title
  })

  res.render('remove-movie',{title : title})
})



app.listen(PORT, function(){
    console.log("Server has started!")
})