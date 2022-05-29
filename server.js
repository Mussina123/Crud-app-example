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

 // Middleware included //
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())

// Routes //

    app.get('/', (req, res) => {
    //    const curser = db.collection('quotes').find()
    //    console.log(curser)
       db.collection('quotes').find().toArray()
       .then (results => {
           console.log(results)
           res.render('index.ejs', { quotes: results })
       })
       .catch(error => console.error(error))
  
        // res.sendFile(__dirname + '/index.html')
        // console.log(__dirname)
    })
    app.put('/quotes', (req, res) => {
        console.log(req.body)
        quotesCollection.findOneAndUpdate(
            { name: 'Yoda' },
            {
              $set: {
                name: req.body.name,
                quote: req.body.quote
              }
            },
            {
              upsert: true
            }
          )
            .then(result => res.json('Success'))
            .catch(error => console.error(error))
            
    })

    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            { name: req.body.name }
          )
            .then(result => res.json('Deleted Darth Vadar\'s Quote'))
            .catch(error => console.error(error))
            .then (result => {
                if (result.deletedCount === 0) {
                  return res.json('No quote to delete')
                }
                res.json(`Deleted Darth Vadar's quote`)
              })
              .catch(error => console.error(error))
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
