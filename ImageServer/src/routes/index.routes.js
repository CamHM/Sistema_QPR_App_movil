const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');
const base64ToImage = require('base64-to-image');
const image2base64 = require('image-to-base64');
const fs = require('fs');

//Establecer como se van a guardar las imagenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: (req , file , callback) => {
        callback(null, file.filename + path.extname(file.originalname));
    }
})

router.get('/', (req, res) => {
    res.render('index');
})

//Middleware --Se ejecutan antes de llegar a las rutas
const upload = multer({
    storage, //Se configura que quiere que se guarde con el nombre inicial
    dest: path.join(__dirname, 'public/images'),
    limits : {
        fileSize: 10000000
    },
    fileFilter : (req, file, callback) =>{
        const filetypes = /jpeg|jpg|png|gif/; //Que tipos de archivos va a permitir
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return callback(null, true);
        }
        callback("Error: Imagen no valida");
    }
}).single('image');


/* Aca van a llegar las imagenes del servidor para guardarlas de manera local */
router.post('/img' , (req, res) => {
    let { nameimg , img , type} = req.body;
    var optionalObj = {fileName: nameimg, type};
    base64ToImage(img,path.join(__dirname, '../public/images/'),optionalObj);
    res.json({ message : `Imagen ${nameimg}.${type} guardada correctamente` , status : true })
})

router.post('/download', (req, res) => {
    let { path_img } = req.body;
    let search = path.join(__dirname, "../public/images/", path_img);
    console.log(search);
    /*image2base64(search).then(
        (response) =>{
            res.json({ img : response});
        }
    ).catch(
        (error) => {
            res.json(error.message); //Exepection error....
        }
    );*/
    // read binary data
    
    var bitmap = fs.readFileSync(search);
    // convert binary data to base64 encoded string
    res.json( {img : new Buffer(bitmap).toString('base64')});
})

module.exports = router;