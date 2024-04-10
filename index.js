import Alumno from "./src/models/alumno.js";
import {sumar, restar, multiplicar, dividir} from "./src/modules/matematica.js";
import { OMDBGetByImdbID, OMDBSearchComplete, OMDBSearchByPage } from "./src/modules/ombd-wrapper.js";

import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.send('Respuesta')
    res.status(200).send();
});

app.get('/saludar/:nombre', (req, res) => {
    res.send(`Hola ${req.params.nombre}`);
    res.status(200).send();
});

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    let fecha = Date.parse(`${(req.params.mes)-1} ${req.params.dia} ${req.params.ano}`);
    if (!isNaN(fecha)){
        res.status(200).send();
    }
    else{
        res.status(400).send();
    }
});

app.get('/matematica/sumar', (req, res) => {
    let resultado = sumar(req.query.n1, req.query.n2);
    res.send(`El resultado es ${resultado}`);
    res.status(200).send();
});

app.get('/matematica/restar', (req, res) => {
    let resultado = restar(req.query.n1, req.query.n2);
    res.send(`El resultado es ${resultado}`);
    res.status(200).send();
});

app.get('/matematica/multiplicar', (req, res) => {
    let resultado = multiplicar(req.query.n1, req.query.n2);
    res.send(`El resultado es ${resultado}`);
    res.status(200).send();
});

app.get('/matematica/dividir', (req, res) => {
    let resultado = dividir(req.query.n1, req.query.n2);
    if (req.query.n2 != 0){
        res.send(`El resultado es ${resultado}`);
        res.status(200).send();
    }
    else{
        res.send("El divisor no puede ser cero.");
        res.status(400).send();
    }
});

app.get('/omdb/searchbypage', async (req, res) => {
    let resultado = await OMDBSearchByPage(req.query.searchText, req.query.page);
    res.send(resultado);
    res.status(200).send();
});

app.get('/omdb/searchcomplete', async (req, res) => {
    let resultado = await OMDBSearchComplete(req.query.searchText);
    res.send(resultado);
    res.status(200).send();
});

app.get('/omdb/getbyomdbid', async (req, res) => {
    let resultado = await OMDBGetByImdbID(req.query.imdbID);
    res.send(resultado);
    res.status(200).send();
});

const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));

app.get('/alumnos', (req, res) => {
    res.send(alumnosArray);
    res.status(200).send();
});

app.get('/alumnos/:dni', (req, res) => {
    let alumno = new Alumno;
    alumnosArray.forEach(item => {
        if (item.dni == (req.params.dni).toString()){
            alumno = item;
        }
    })
    res.send(alumno);
    res.status(200).send();
});

app.post('/alumnos', (req, res) => {
    let obj = req.body;
    alumnosArray.push(new Alumno(obj.username, obj.dni, obj.edad));
    res.status(201).send();
})

app.delete('/alumnos', (req, res) => {
    let dni = req.body;
    if (alumnosArray.findIndex(dni) != -1){
        delete alumnosArray[findIndex(dni)];
        res.status(200).send();
    }
    else{
        res.status(400).send();
    }
})