const express = require('express');
const ejs = require('ejs');
const path = require('path');



//Inicialización
const app = express();

//Setting
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Start server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})



//Routes --> De esta forma se define las rutas desde un archivo externo
app.use(require('./routes/index.routes'))