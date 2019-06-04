var express = require('express');
var router = express.Router();
var {client} = require('../model/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Obtener publicaciones que el usuario ha realizado */
router.get('/:code_person', (req, res) => {
  let code_person = req.params.code_person;
  client.query(`SELECT ID_POST,CODE_PERSON,DATE, CONTENT, LATITUDE, LONGITUDE
                FROM POST
                WHERE CODE_PERSON = $1
                ORDER BY ID_POST`, [code_person], 
  (err, results) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json(results.rows);
    }
  });
})

/* Obtener todas las publicaciones */
/* Se dejo quemado el valor que va a ser de a 3 el incremento de los post */
router.get('/:limit/:code_person', (req, res) => {
  let limit = req.params.limit;
  let code_person = req.params.code_person;
  client.query(`SELECT ID_POST,CODE_PERSON,DATE, CONTENT, LATITUDE, LONGITUDE
                FROM POST
                WHERE CODE_PERSON != $1
                ORDER BY ID_POST
                LIMIT $2
                OFFSET 3 `, [code_person, limit], 
  (err, results) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json(results.rows);
    }
  });
})

/* Agregar Publicación */
router.post('add', (req, res) =>{
  let { code_person, date,content, latitude, longitude } = req.body;
  client.query(`INSERT INTO POST (id_post, code_person, date, content, latitude, longitude) 
  values (nextval('id_post_sequence'),$1,$2,$3, $4, $5)`, 
  [code_person, date, content, latitude, longitude], 
  (err, result) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json({ message : `Person added with Name: ${name_platform}`});
    }
  });
})



module.exports = router;