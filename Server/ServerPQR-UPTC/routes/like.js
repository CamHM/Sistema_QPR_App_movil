var express = require('express');
var router = express.Router();
var {client} = require('../model/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Obtener el numero de Likes de una publicación */
router.get('/:id_post' , (req, res) =>{
  let id_post = req.params.id_post;
  client.query(`SELECT ID_COMMENT
              FROM COMMENT
              WHERE ID_POST = $1`,
              [id_post], 
  (err, result) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json( { likes : result.rowCount });
    }
  });
})

/* Obtener si la persona realizo like a la publicación
Retorna 1 o 0
1: Si dio like
0: No dio like */
router.post('/', (req, res) =>{
  let {id_post, code_person} = req.body;
  client.query(`SELECT ID_LIKE
              FROM LIKE
              WHERE ID_POST = $1
              AND CODE_PERSON = $2`, [id_post, code_person], 
  (err, result) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json({ result : result.rowCount });
    }
  });
})

/* Agregar Like a publicacion */
router.get('/add/:id_post/:code_person', (req, res) =>{
  let id_post = req.params.id_post;
  let code_person = req.params.code_person;
  //res.json({id_post, code_person});
  client.query(`INSERT INTO LIKE (id_like, id_post, code_person) 
  VALUES (nextval(id_like_sequence),$1,$2)`, 
  [id_post, code_person], 
  (err, result) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json({ message : `Like added : ${code_person}`});
    }
  });
})

/* Eliminar Like a publicación */
router.get('/remove/:id_like', (req, res) =>{
  let id_like = req.params.id_like;
  //res.json({id_like});
  client.query(`DELETE FROM  LIKE WHERE ID_LIKE = $1`, 
  [id_like], 
  (err, result) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json({ message : `Like added : ${code_person}`});
    }
  });
})

module.exports = router;