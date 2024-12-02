require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3001; // Puerto donde corre el backend
const cors = require("cors")
// require('./database'); // Si tenemos las variables de db en el .env entonces descomentamos

// Middleware
app.use(express.urlencoded({ extended: false })); // No recuerdo
app.use(express.json()); // Para tener las peticiones como json
app.use(cors()) // Bueno, activa el cors.

// ENRUTADORES // Los enrutadores permiten manejar las rutas de manera mas modulada
const authRouter = require("./routes/authRouter"); 
const devRouter = require("./routes/devRouter");

// RUTAS // Aca tenemos las rutas
app.use("/", authRouter); // La de home va al auth router   --> http://localhost:3001/             // Nota, si dentro del router de auth ponemos una ruta que sea /dev entonces no llega al router de abajo sino que usa ese al estar primero
app.use("/dev", devRouter); // la de dev va al devrouter    --> http://localhost:3001/dev

app.use("/*", (req, res) => { // Si no encuentra ninguna ruta devuelve esto - NOTA: Aca se puede devolver un html mas lindo
    res.status(404).json({
        status: 404,
        error: "Not found"
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});