const express = require('express')
const app = express()

var hbs = require('hbs');
require('./hbs/helpers')

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

    res.render('home', {
        nombre: 'camilo parra'
    });

})

app.get('/about', (req, res) => {

    res.render('about', {
        nombre: 'camilo parra'
    });

})

app.get('/data', (req, res) => {

    res.send('Hola Data')

})

app.listen(port, () => {
    console.log(`escuchando peticiones en el puerto ${ port }`);
});