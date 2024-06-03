const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://freshMartUser:ekx57pd3epBO4oHf@cluster0.weuf9zh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
 
    await client.connect();
 
    console.log("Database is connected");
  } finally {
   
  }
}
run().catch(console.dir);





app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});



// freshMartUser
// ekx57pd3epBO4oHf