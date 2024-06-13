const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const dotenv = require("dotenv").config();


connectDb();
const app= express();   
app.use(cors(
    {
        origin: ["https://mycontacts-frontend.vercel.app/", "http://localhost:5173/"],
        methods:["GET", "POST", "DELETE", "PUT"],
    }
));
const port = process.env.PORT || 5000;
app.use(express.json()); //middleware, body parser for when client sends any data to server and 
                        //server has to parse that text, for eg, in createContacts
app.use("/api/contacts", require ("./routes/contactRoutes"));

app.use("/api/users", require ("./routes/userRoutes"));

app.get('/', (req, res) => {
    res.send('Hello from Vercel!');
});
app.use(errorHandler);
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});     