const express = require('express');
const ejs = require('ejs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');


//Inicialización
const app = express();

//Setting
app.set('port', 3300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//LOGGER
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Start server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})



//Routes --> De esta forma se define las rutas desde un archivo externo
app.use(require('./routes/index.routes'))