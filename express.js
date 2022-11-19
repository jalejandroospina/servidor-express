const express = require ('express'); 
// const contenedor = require('./contenedor');
// const producto = new contenedor.Contenedor("file.txt");

//Clase
const { Console } = require('console');
const fs = require('fs');

const productos = [];

class Contenedor
{
    
        constructor (file)
        {
            this.file = file;
            //console.log(`Trabajando con el archivo ${this.file}`);
        }
    

        save(obj) // Recibe objeto  y lo guarda en  el archivo
        {   
            (async()=>
            {
                try
                {
                    const objString = JSON.stringify(obj,null,2);   // Guardar obj en String 
                    productos.push(objString); // pusheo el string al array
                    await fs.promises.writeFile('./file.txt',productos); // sobreescribo el archivo
                 
                }
                catch(e)
                {
                    console.log(e.message);
                }

            })()
        }

        getByid(id)
        {
            (async()=>
            {
                try
                    {
                        const read = await fs.promises.readFile('./file.txt','utf-8'); // leo el archivo
                        console.log("leo del archivo un tipo " +  typeof read); // recibo string
                        const stringObj = JSON.parse(read); // lo convierto en obj

                        //recorrer array para saber id
                        const byId = stringObj.find((product)=>{
                        const isProduct = product.id === id;
                        return isProduct;
                        })
                        console.log (byId); // muestro el item con el id ingresado

                    
                    }
                    catch (err)
                    {
                        console.error(err);
                    }

            })()
 
        }

        getAll()
        {   
            (async()=>
            {
                try
                    {
                        const read = await fs.promises.readFile('./file.txt','utf-8'); // leo el archivo
                        const stringObj = JSON.parse(read); // lo convierto en obj
                        //console.log(stringObj) // muestro el objeto con los elementos 
                        
                                            
                    }
                    catch (err)
                    {
                        console.error(err);
                    }

            })()
        }

        deleteAll()
        {   
            const empty = []; // array vacio
            (async()=>
            {
                try
                    {
                        productos.push(empty); // pusheo el string vacio al array
                        await fs.promises.writeFile('./file.txt',productos); // sobreescribo el archivo
                        
                    }
                    catch (err)
                    {
                        console.error(err);
                    }

            })()
        }
        

        deletById(id)
        {

            (async()=>
            {
                try
                    {
                        const read = await fs.promises.readFile('./file.txt','utf-8'); // leo el archivo
                        const stringObj = JSON.parse(read); // lo convierto en obj

                        const indexById = stringObj.findIndex((product)=> // busco el indice del item por id
                        {
                        const isProduct = product.id === id; 
                        return isProduct;
                        })
                        console.log(indexById);

                        productos.splice(indexById,1); // elimino el item por su indice
                        console.log(stringObj);

                        const objString = JSON.stringify(stringObj,null,2);   // Guardar obj en String 
                        productos.push(objString); // pusheo el string al array
                        await fs.promises.writeFile('./file.txt',productos); // sobreescribo el archivo
                                            
                    }
                    catch (err)
                    {
                        console.error(err);
                    }

            })()

            

        }
        
    }
    const producto = new Contenedor("file.txt");
    //producto.getAll();
    console.log("console de clase "+  producto.getAll());
    
    //////////////////////


// Servidor
const app = express(); // creo la app de express
const PORT = 8080; // variable para el puerto

const server = app. listen(PORT,()=>{       // en escuhca al servidor
    console.log (`Servidor Express en el puerto ${PORT}`);

    server.on('error', err =>{
        console.log(`Error en el servidor ${err}`); // catchear error 
    })
})

app.get('/',(req , res)=>{  // defino las URL's
    return res.send('Bienvenido al servidor express');
    })

app.get('/productos',(req, res) => {
     
    return res.send(producto.getAll());
    
    
    
})
    
app.get('/productoRandom',(req, res) => {
    // producto al azar
})