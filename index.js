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
