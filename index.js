const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient  } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 4000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xxcl9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db('travelAgency');
        const courseCollection = database.collection('tour');

        // Get API //
        // Get API //

        app.get('/course', async (req, res) => {
            const cursor = courseCollection.find({});
            const courses = await cursor.toArray();
            res.send(courses);
        })


        //single data api
        app.get('/courseSingle/:id', async (req, res) => {
            const courseSingle = await courseCollection.findOne({ _id:(req.params.id) })
            res.json(courseSingle);
        })

    }
    finally {
        // await client.close();
    }

}

run().catch(console.dir);

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('server is running');
});

app.listen(port, () => {
    console.log('server running at port', port);
})