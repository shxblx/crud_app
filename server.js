const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');

const route = require('./server/routes/router'); 
const connectDB = require('./server/database/connection')

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080;

// log requestsq
// app.use(morgan('tiny')); 

app.use(express.urlencoded({extended:false}));

app.use(session({ 
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false 
})); 
 
//clear cache 
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
    res.setHeader("Pragma", "no-cache"); 
    // res.setHeader("Expires", "0"); 
    next()
});

// mongodb connection
connectDB(); 

// set view engine
app.set('view engine', 'ejs');

// load assets
app.use('/css',express.static(path.resolve(__dirname, 'assets/css')));
app.use('/images',express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js',express.static(path.resolve(__dirname, 'assets/js')));
app.use('/fonts',express.static(path.resolve(__dirname, 'assets/fonts')));

// load routers
app.use('/',require('./server/routes/router')) 
 

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

