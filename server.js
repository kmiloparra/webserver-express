const express = require('express');
const app = express();
const axios = require('axios');
var fs = require('fs');


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


async function getInstance(infoRequest) {
    
    
    const instance = axios.create(infoRequest);

    const resp = await instance.get();

    return resp;
  }

  

app.get('/data', (req, res) => {

    let infoRequest = {
        baseURL: `https://api.github.com/user/repos?per_page=500`,
        headers: {Authorization: 'Bearer 1f240b4e7ed6d4f8aa90418529d471a58976bf5e'}
    };
    
    const getInfo = async() => {
        let repos = await getInstance(infoRequest);
        return repos;
    };
    
    getInfo().then((result) => {
        result.data.forEach(element => {
            console.log(element.name);
        });
    });

});

app.post('/approved/pull', (req, res) => {

    let url ='http://bb-stg-alb-ecs-ext-902953221.us-east-2.elb.amazonaws.com/castlemock/mock/rest/project/ZQpJUE/application/VoIt4w/bocc-libreinversion-backend-customer-profiling-bpm-ms/pulls/142/reviews'

    let infoRequest = {
        baseURL: url,
        headers: {Authorization: 'Bearer 1f240b4e7ed6d4f8aa90418529d471a58976bf5e'}
    };
    
    axios({
        method: 'post',
        url,
        headers: {Authorization: 'Bearer 1f240b4e7ed6d4f8aa90418529d471a58976bf5e'},
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
        }
      }).then((result) => {
          
        res.send(result.data)
      }).catch(err => {
        console.log("ERROR", err);
        const responseFail = {
          statusCode: 500,
          body: JSON.stringify(err.message)
        };
      });

});



 



app.listen(port, () => {
    console.log(`escuchando peticiones en el puerto ${ port }`);
});