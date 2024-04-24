const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.31ubjs2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



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
    await client.connect();

   const coffeeCollection = client.db('coffeeDB').collection('coffee');



    app.post('/coffee',async(req,res)=>{
        const newCoffee =req.body;
        const result = await coffeeCollection.insertOne(newCoffee);
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




app.get('/',(req,res)=>{
    res.send('Coffee Shop Server Is Running..')
})


app.listen(port,()=>{
    console.log(`Coffee server is running at ${port}`);
})