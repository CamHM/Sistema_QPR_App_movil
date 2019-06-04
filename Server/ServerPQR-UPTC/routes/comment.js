var express = require('express');
var router = express.Router();
var {client} = require('../model/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Agregar comentario */
router.post('/add', (req, res) =>{
  let {id_post, code_person, text_comment} = req.body;
  client.query(`INSERT INTO COMMENT (id_comment,id_post,code_person, text_person)
  values (nextval(id_comment_sequence), $1,$2,$3)`,
  [id_post,code_person, text_comment], 
  (err, result) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json({ message : `Comment added : ${code_person}`});
    }
  });
})

/* Ver comentarios de una publicación */
router.get('/:id_post', (req, res) => {
  let id_post = req.params.id_post;
  client.query(`SELECT ID_COMMENT, CODE_PERSON, TEXT_COMMENT
              FROM COMMENT
              WHERE ID_POST = $1`,[id_post], 
  (err, results) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json(results.rows);
    }
  });
})

module.exports = router;