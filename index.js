const express = require('express');
const app = express();
const cors =require('cors');
app.use(express.json()); //sirmpre que se necesite datos json CRUD
require('dotenv').config();
const port = process.env.PORT;
app.use(cors());

let platillos = [
    {
    id:1,
    nombre: "Guacamole",
    precio: 20.35
  
    }
];

app.get('/', (req, res) => {
  res.send('API de platillos UCAMp v1.0.......');
});



app.get('/platillos', (req, res) => {
    res.json({
        mensaje: "Platillos disponibles 3",
        data: platillos

    });
  });

  app.post('/platillos', (req, res) => {
    console.log(req.body);
    let nuevoPlatillo=req.body;
    platillos.push(nuevoPlatillo);


    res.json({
        mensaje: "Se agrego el platillo",
        data: nuevoPlatillo

    });
  });

  app.put('/platillos/:id', (req, res) => {
    //buscar que exista el elemento a modificar
    let id = parseInt(req.params.id);
    let platilloResultado = platillos.find(platillo =>platillo.id===id);
    platilloResultado.nombre=req.body.nombre;
    platilloResultado.precio=req.body.precio;
    platilloResultado.descripcion=req.body.descripcion;


    res.send('actualizar platillos');
  });

  app.delete('/platillos/:id', (req, res) => {
        
        let id = parseInt(req.params.id);
        const indice = platillos.findIndex(platillo => platillo.id ===id);
        let delPlatillo = platillos[indice];
        platillos.splice(indice,1);

    //res.send('borrar platillos');

    res.json({
        mensaje: "Se elimino el platillo",
        data: delPlatillo
    });
  });




  app.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:' + port);
  });