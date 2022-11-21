 
// Servidor
const clase = require("./contenedor");



const express = require('express')
const app = express(); // creo la app de express
const PORT = 8080; // variable para el puerto

const server = app. listen(PORT,()=>{       // en escucha al servidor
    console.log (`Servidor Express en el puerto ${PORT}`);

    server.on('error', err =>{
        console.log(`Error en el servidor ${err}`); // catchear error 
    })
})

app.get('/',(req , res)=>{  // defino las URL's
    return res.send('Bienvenido al servidor express');
    })

app.get('/productos',(req, res) => {
    console.log(clase.getAll()); // undefined
    return res.send(clase.getAll());
    
})
    
app.get('/productoRandom',(req, res) => {
    // producto al azar
})