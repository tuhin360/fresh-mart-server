const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://freshMartUser:ekx57pd3epBO4oHf@cluster0.weuf9zh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const productDB = client.db("productDB");
    const productsCollection = productDB.collection("productsCollection");

    // product routes
    app.post("/products", async (req, res) => {
      const productsData = req.body;
      const result = await productsCollection.insertOne(productsData);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const productsData = productsCollection.find();
      const result = await productsData.toArray();
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const productsData = await productsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(productsData);
    });

    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const productsData = await productsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      res.send(productsData);
    });


    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const productsData = await productsCollection.deleteOne(
        { _id: new ObjectId(id) },
      );
      res.send(productsData);
    });

    console.log("Database is connected");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Route is working");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// freshMartUser
// ekx57pd3epBO4oHf
