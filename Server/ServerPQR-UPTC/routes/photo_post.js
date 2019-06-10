var express = require('express');
var router = express.Router();
var {client , urlServer1 } = require('../model/db');
var axios = require('axios');
var uuidv4 = require('uuid/v4');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Enviar las fotos que vienen del servidor
router.post('/post', (req, res) => {
  let { id_post } = req.body;
  client.query(`SELECT PATH_PHOTO as img FROM PHOTO_POST WHERE ID_POST = $1`,
  [id_post], 
  (err, results) => {
    if (err) {
      res.status(401).json({ message : `${err.message}`});
    }else{
      res.status(201).json(results.rows);
    }
  });
})

/* Llegan fotos que fueron montadas en la publicación */
router.post('/', (req, res) => {
  let { post, code_person, img} = req.body;
  console.log("Llego ", post);
  let id_post = post;
  let nameimg = uuidv4();
  let type = 'jpeg'
  axios.post(urlServer1 + "/img", {
    nameimg,
    img,
    type
  }).then( (response) => {
    let {message, status } = response.data;
    console.log(message);
    if(status){
      console.log("el id que me envio es: ",id_post);
      path_photo = nameimg + "." + type;
      client.query(`INSERT INTO PHOTO_POST (ID_PHOTO_POST, ID_POST, CODE_PERSON, PATH_PHOTO)
                  VALUES (nextval('id_photo_post_sequence'),$1,$2,$3)`, 
      [id_post, code_person, path_photo], 
      (err, result) => {
        if (err) {
          console.log(err.message);
          res.status(401).json({ message : `${err.message}`});
        }else{
          res.status(201).json( { message });
        }
      });
    }
  }).catch( (error) =>{
    console.log(error);
  });
})
module.exports = router;