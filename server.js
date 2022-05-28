const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const app = express();
const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://yodaisthebest:Eagles35$@cluster0.n0kynsu.mongodb.net/?retryWrites=true&w=majority'

// MongoClient.connect(connectionString, (err, client) => {
//     if (err) return console.error(err)
//     console.log('Connected to Database')
// })

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.set('view engine', 'ejs')
    // res.render(view, locals)
    app.use(bodyParser.urlencoded({ extended: true }))
    app.get('/', (req, res) => {
       const curser = db.collection('quotes').find()
       console.log(curser)
       db.collection('quotes').find().toArray()
       .then (results => {
           console.log(results)
           res.render('index.ejs', { quotes: results })
       })
       .catch(error => console.error(error))
  
        // res.sendFile(__dirname + '/index.html')
        // console.log(__dirname)
    })
    
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            res.redirect('/')
        })
        .catch(error => console.error(error))
        // console.log(req.body)
    })
    app.listen(3000, function() {
        console.log('listening on port 3000')
    })
  })
//   .catch(error => console.error(error))





// console.log('May Node be with you')





// Handlers below!

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
//     console.log(__dirname)
// })

// app.post('/quotes', (req, res) => {
//     console.log(req.body)
// })
