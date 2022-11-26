const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

// user: assignment-12
// password: FCU29fNSxmazGxA1


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ub5swj4.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){

   try{
  const productConnection = client.db('assignment-12').collection('allProduct');


   }
   finally{

   } 

}
run().catch(err => console.log(err));

app.get('/', async(req,res) =>{
    res.send('assignment server is running')
})

app.listen(port, () =>{
    console.log(`server running port on ${port}`)
})
