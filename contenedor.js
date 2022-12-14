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
                    
                    productos.push(obj); // pusheo el string al array
                    const objString = JSON.stringify(productos, null, 2); // Guardar obj en String
                    await fs.promises.writeFile("./file.txt", objString); // sobreescribo el archivo
                 
                   
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
                        //console.log("leo del archivo un tipo " +  typeof read); // recibo string
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
                        console.log(stringObj); // muestro el objeto con los elementos 
                        return stringObj

                                    
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
        

        deleteById(id)
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

                        stringObj.splice(indexById,1); // elimino el item por su indice
            
                        const objString = JSON.stringify(stringObj,null,2);   // Guardar obj en String 
                        await fs.promises.writeFile('./file.txt',objString); // sobreescribo el archivo
                                            
                    }
                    catch (err)
                    {
                        console.error(err);
                    }

            })()

            

        }
        
    }

    module.exports = new Contenedor("file.txt");