require("dotenv").config();
const express = require('express');
const connection = require('./dbConnection/connection.js');
const userauthRoute = require('./routes/userauth.route.js');
const userTaskRoute = require('./routes/todo.route.js');
const {checkForAuthentication} = require('./middlewares/auth.middleware.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8023;



// Make Connection
connection();

//Use Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

//Routes
app.use("/api/v1/auth", userauthRoute);
app.use("/api/v1/todo",checkForAuthentication, userTaskRoute);


//Listening Part
app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT: ${PORT}`);
})