const express = require('express');
const cors = require('cors');
 require('dotenv').config();

const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// cosmetics
// Mnf1eUpP4EIXt5aO



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b2avmfb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const cosmeticCollection = client.db('cosmeticDB').collection('cosmetics');
    const cardCollection=client.db('cardDB').collection('cards');
    

    app.get('/cosmetics', async (req, res) => {
        const cursor = cosmeticCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.post('/cosmetics', async (req, res) => {
        const newProduct = req.body;
        console.log(newProduct);
        const result = await cosmeticCollection.insertOne(newProduct);
        res.send(result);
    })
   
    app.get('/cards', async (req, res) => {
        const cursor = cardCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get('/cards/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await cardCollection.findOne(query);
        res.send(result);
    })
    app.put('/cards/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) }
        const options = { upsert: true };
        const updateCosmetics = req.body;

        const cosmetics = {
            $set: {
                name: updateCosmetics.name,
                price:updateCosmetics.price,
                productName:updateCosmetics.productName,
                rating:updateCosmetics.rating,
                type:updateCosmetics.type,
                productImage: updateCosmetics.productImage,
               
                
                
               
                
            }
        }

        const result = await cardCollection.updateOne(filter, cosmetics, options);
        res.send(result);
    })
    app.post('/cards', async (req, res) => {
        const product = req.body;
        console.log(product);
        const result = await cardCollection.insertOne(product);
        res.send(result);
    })
    app.delete('/cards/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await coffeeCollection.deleteOne(query);
        res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('cosmetics and beauty server is running')
})

app.listen(port, () => {
    console.log(`cosmetics and beauty is running on port: ${port}`)
})