var express = require('express');
var router = express.Router();
var {client, urlServer1, urlServer2} = require('../model/db');

/*Obtener lista de personas*/
router.get('/', function(req, res) {
  client.query('SELECT * FROM PERSON', (err, results) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
        res.status(200).json(results.rows);
    }
  })
});

/* Agregar persona */
router.post('add', (req, res) =>{
  let { code_person, first_name, last_name,type_person, email, password } = req.body;
  client.query(`INSERT INTO PERSON (code_person, first_name, last_name, type_person, email, password) 
  values ($1,$2,$3,$4,$5,$6)`, 
  [code_person,first_name,last_name,type_person,email,password], 
  (err, result) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json({ message : `Person added with Name: ${name_platform}`});
    }
  });
})

/*Modificar Persona*/
router.put('update',(req, res) =>{
  let { code_person, first_name, last_name,type_person, email, password } = req.body;
  client.query(`Update PERSON SET first_name = $2, last_name = $3, type_person = $4 , email = $5, password = $6 WHERE code_person = $1`, 
  [code_person,first_name,last_name,type_person,email,password],
  (err, result) =>{
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json({ message : `Person update with Name: ${name_platform}`});
    }
  })
});

/*Recibir foto de perfil Persona */
router.post('image/:code_person', (req, res) =>{
  let code_person = parseInt(req.params.code_person);
})
/*Mandar  foto de perfil Persona*/

module.exports = router;