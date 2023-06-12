const express = require('express');
const {query} = require('express');
const { request } = require('http');
const app = express();

const mySQL = require('mysql');
const dbConnect = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "api_dwwm_garage"
});


app.use(express.static('public'));
app.use(express.json());

app.set('views', './views');
app.set('view engine', "ejs");

app.listen(8080);

dbConnect.connect(err=>{
    if(err) throw err;
    else console.log('Connecté!');
})


// create:
app.post('/voiture', (request, response)=>{
    dbConnect.query("INSERT INTO voiture (marque, modele, kilometrage, prix) VALUES ('"+request.body.marque+"', '"+request.body.modele+"', '"+request.body.kilometrage+"'; '"+request.body.prix+"');", (err, result)=>{
        if(err) throw err;
        else response.status(200).json(result);
    })
})

// read
app.get('/voiture', (request, response)=>{
    dbConnect.query("SELECT * FROM voiture;", (err, result)=>{
        if(err) throw err;
        else response.status(200).json(result);
        console.log(result);
    })
})

// update
app.put('/voiture/:id', (request, response)=>{
    dbConnect.query("UPDATE `voiture` SET `marque`='"+request.body.marque+"',`modele`='"+request.body.modele+"',`kilometrage`='"+request.body.kilometrage+"',`prix`='"+request.body.prix+"' WHERE id= "+request.params.id+";", (err, result)=>{
        if(err) throw err;
        else response.status(200).json(result);
    })
})

// delete
app.delete('/voiture/:id', (request, response)=>{
    dbConnect.query("DELETE FROM voiture WHERE id="+request.params.id+";", (err, result)=>{
        if(err) throw err;
        else response.status(200).json(result);
    })
})

app.get('/', (request, response)=>{
    response.render('index')
});