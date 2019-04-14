const express = require('express');
const bodyParser = require('body-parser');
const db = require('./index');
let cors = require('cors');
const path = require('path');
const app = express();


// mongoose.connect('localhost:5002');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('index.html'));
//__dirname +
//testing connection
// app.get('/', function(req, res) {
//   res.send('Hello World');
// });

//Get request for html page to render on homepage

app.get('/', (req, res)=> {
  let getPath = path.join(__dirname, 'index.html');
  res.sendFile(getPath);
});

//Get request for html page to render at endpoint

app.get('/:id', (req, res)=> {
  let getPath = path.join(__dirname, 'index.html');
  res.sendFile(getPath);
});

//Get request to get database images based on id
app.get('/images/:id', (req, res)=> {
  console.log(req.params.id);
  db.find({imageId: req.params.id}, (err, images) =>{
    console.log('***** server index.js', images);
    if (!err) {
      res.send (images);
    } else {
      console.log('error with get');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

//make sure to sort the Mongo DB before rendering
//use FRBO;
//db.images.find().sort({imageId:1, imageIndex:1})