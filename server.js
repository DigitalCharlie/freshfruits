/////////////////////////////////////////////
// Import Our Dependencies 
/////////////////////////////////////////////
require('dotenv').config(); // Loads Env vars into process.env
const express = require('express'); 
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const fruitController = require('./controllers/fruit')

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = express()
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx')

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); // logging
app.use(express.urlencoded({extended:true}));  // parse urlencoded request bodies
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.static("public")); // serve files from public statically
app.use('/fruits', fruitController); // tells fruit route to use fruit controller


/////////////////////////////////////////////////////
// Homepage
/////////////////////////////////////////////////////
app.get("/", (req,res) => {
    res.send("your server is running... better go catch it.")
});


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));