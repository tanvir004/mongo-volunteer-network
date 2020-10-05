const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;



const app = express();
app.use(cors());
app.use(bodyParser.json());


const port = 5000;
// const password = 'PHZepBzP62WgcnW';
// console.log(process.env.DB_USER);
const uri = `mongodb+srv://volunteerNetworkDB:PHZepBzP62WgcnW@cluster0.nx6j2.mongodb.net/vNetworkdb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const uri = "mongodb+srv://volunteerNetworkDB:<password>@cluster0.nx6j2.mongodb.net/<dbname>?retryWrites=true&w=majority";

client.connect(err => {
    const collection = client.db("vNetworkdb").collection("data");
    const homeCollection = client.db("vNetworkdb").collection("volunteeerDetails");
    const userEventCollection = client.db("vNetworkdb").collection("event");
    // perform actions on the collection object
  
    // app.get('/uservolunteer')
    app.post('/newReg', (req, res) => {
      console.log(req.body)
      const data = req.body
        collection.insertOne(data)
        .then(result => console.log(result))
        .catch(error => console.log(error))
  })

  app.post('/newEvent', (req, res) => {
    console.log(req.body)
    const newData = req.body
    homeCollection.insertOne(newData)
      .then(result => console.log(result))
      .catch(error => console.log(error))
})

app.post('/userEvent', (req, res) => {
  console.log(req.body)
  const newData = req.body
  userEventCollection.insertOne(newData)
    .then(result => console.log(result))
    .catch(error => console.log(error))
})
  
  app.get('/volList', (req, res)=>{
    collection.find({})   //email: req.query.email
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })

  app.get('/userEventShow', (req, res)=>{
    userEventCollection.find({})   //email: req.query.email////
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })

  app.get('/homeList', (req, res)=>{
    homeCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })




  })





app.listen(port);