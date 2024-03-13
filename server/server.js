const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

const jsonData = require('./db/db.json');

app.get('/ingredientes', (req, res) => {
  res.json(jsonData);
});

app.get('/burgers', (req, res) => {
  res.json(jsonData);
});

app.get('/status', (req, res) => {
  res.json(jsonData);
});

app.post('/burgers', (req, res) => {
  const newBurger = req.body;
  jsonData.burgers.push(newBurger);
  fs.writeFile('./db/db.json', JSON.stringify(dbJson, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao salvar o arquivo db.json');
    }
    res.status(201).json(newBurger);
  });
});

app.delete('/burgers/:id', (req, res) => {
  const id = req.params.id;
  const index = dbJson.burgers.findIndex(burger => burger.id === id);
  if (index !== -1) {
    jsonData.burgers.splice(index, 1);
    fs.writeFile('./db/db.json', JSON.stringify(dbJson, null, 2), (err) => {
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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});