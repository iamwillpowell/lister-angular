const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectID = require("mongodb").ObjectID;


const app = express();
const port = 3000;

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(express.json());
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

MongoClient.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/lister",
  { useNewUrlParser: true },
  (err, database) => {
    if (err) {
      return console.error(err);
    }

    const db = database.db('lister');
    const col = db.collection('lists');

    // GET All
    app.get('/api/lists/', (request, response) => {
      col.find().toArray((err, result) => {
        if (err) {
          console.error('find error:', err);
          response.send({ error: 'Bummer, an error occurred' });
        } else {
          response.send(result);
        }
      });
    });

    // POST
    app.post('/api/lists', (request, response) => {
      const list = {
        title: request.body.title,
        text: request.body.text
      };

      col.insertOne(list, (err, result) => {
        if (err) {
          console.error('insert error:', err);
          response.send({ error: 'Bummer, an error occurred' });
        } else {
          response.send(result.ops[0]);
        }
      });
    });

    // GET
    app.get('/api/lists/:id', (request, response) => {
      const id = request.params.id;
      const details = { _id: ObjectID(id) };
      col.findOne(details, (err, item) => {
        if (err) {
          console.error('insert error:', err);
          response.send({ error: 'Bummer, an error occurred' });
        } else {
          response.send(item);
        }
      });
    });

    // PUT
    app.put('/api/lists/:id', (request, response) => {
      const id = request.params.id;
      const details = { _id: ObjectID(id) };
      const note = {
        title: request.body.title,
        text: request.body.text
      };
      col.update(details, note, (err, result) => {
        if (err) {
          console.error('delete error:', err);
          response.send({ error: 'Bummer, an error occurred' });
        } else {
          console.log(result);
          response.send(result);
        }
      });
    });

    // DELETE
    app.delete('/api/lists/:id', (request, response) => {
      const id = request.params.id;
      const details = { _id: ObjectID(id) };
      col.deleteOne(details, (err, result) => {
        if (err) {
          console.error('delete error:', err);
          response.send({ error: 'Bummer, an error occurred' });
        } else {
          response.send(`${result.deletedCount} deleted`);
        }
      });
    });

    // Default redirect
    app.get('*', function (req, res) {
      res.redirect('/');
    });

    app.listen(port, () => {
      console.log(`API listening on port:${port}`);
    });
  }
);


