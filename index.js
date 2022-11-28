const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ub5swj4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

    try {
        const productConnection = client.db('assignment-12').collection('allProduct');
        const ordersCollection = client.db('assignment-12').collection('order')
        const userCollection = client.db('assignment-12').collection('user')

        app.get('/service/:category_id', async (req, res) => {
            const id = req.params.category_id;
            console.log(id)
            const query = {category_id: id}
            const product = productConnection.find(query)
            const products = await product.toArray();
            res.send(products);
        })
        app.post('/orders', async(req,res) =>{
            const order = req.body;
            console.log(order)
            const result = await ordersCollection.insertOne(order)
            res.send(result);
        })
        app.get('/orders', async(req,res) =>{
            const email = req.query.email;
            const query ={email: email};
            const order = await ordersCollection.find(query).toArray();
            res.send(order);
        })
        app.post('/allUser', async(req,res) =>{
            const user = req.body;
            const result = await userCollection.insertOne(user)
            res.send(result);
        })
        app.get ('/allUser', async(req,res) =>{
            const query = {};
            const users = await userCollection.find(query).toArray()
            res.send(users)
        })
       app.get('/allUser/admin/:email', async(req,res) =>{
        const email = req.params.email;
        const query = {email}
        const user = await userCollection.findOne(query);
        res.send({ isAdmin: user?.role === 'admin'});
       })
        app.put('/allUser/admin/:id', async(req,res) =>{

            if(user?.role !== 'admin'){
                return res.status(403).send({message: 'forbidden access'})
            }
            const id = req.params.id;
            const filter = {_id: ObjectId(id)}
            const option = { upsert: true};
            const updatedoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await userCollection.updateOne(filter,updatedoc, option)
            res.send(result);
        })
    }
    finally {

    }

}
run().catch(err => console.log(err));

app.get('/', async (req, res) => {
    res.send('assignment server is running')
})

app.listen(port, () => {
    console.log(`server running port on ${port}`)
})
