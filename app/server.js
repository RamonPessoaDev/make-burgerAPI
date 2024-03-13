const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3002;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'make_burger',
//   password: 'RadSQL07#',
//   port: 5432,
// });

// app.get('/burgers', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM burgers');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Erro ao buscar os burgers');
//   }
// });

app.use(express.json());

const dbPath = path.join(__dirname, 'app', 'db.json');

app.get('/ingredientes', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao ler o arquivo db.json');
    }
    const dbJson = JSON.parse(data);
    res.json(dbJson);
  });
});

app.get('/burgers', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao ler o arquivo db.json');
    }
    const dbJson = JSON.parse(data);
    res.json(dbJson.burgers);
  });
});

app.get('/status', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao ler o arquivo db.json');
    }
    const dbJson = JSON.parse(data);
    res.json(dbJson.status);
  });
});

app.post('/burgers', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao ler o arquivo db.json');
    }
    const dbJson = JSON.parse(data);
    const newBurger = req.body;
    dbJson.burgers.push(newBurger);
    fs.writeFile(dbPath, JSON.stringify(dbJson, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao salvar o arquivo db.json');
      }
      res.status(201).json(newBurger);
    });
  });
});

app.delete('/burgers/:id', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao ler o arquivo db.json');
    }
    const dbJson = JSON.parse(data);
    const id = req.params.id;
    const index = dbJson.burgers.findIndex(burger => burger.id === id);
    if (index !== -1) {
      dbJson.burgers.splice(index, 1);
      fs.writeFile(dbPath, JSON.stringify(dbJson, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Erro ao salvar o arquivo db.json');
        }
        res.status(200).json({ id: id });
      });
    } else {
      res.status(404).send('Burger não encontrado');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});