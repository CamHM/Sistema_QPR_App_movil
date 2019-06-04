const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');

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

router.post('/upload',upload, (req, res) => {
    console.log(req.file)
   res.json({message : 'uploaded'});
});

router.get(':name', (req, res) => {
    let { name } = req.params.name;
    res.sendFile(path.join(__dirname, "public/images/", name));
})

module.exports = router;