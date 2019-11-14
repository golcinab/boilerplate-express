
const bodyParser = require('body-parser');
var express = require('express');
var app = express();

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
// --> 7)  Mount the Logger middleware here

app.use(function(req, res, next){
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
/* Commented to serve on challenge 3 

app.get('/', function(req, res, next){
    res.send('Hello Express');
});
*/
/** 3) Serve an HTML file */
app.get('/', function(req, res, next){
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

/** 4) Serve static assets  */
const staticPath = __dirname + '/public';
app.use(express.static(staticPath));

/** 5) serve JSON on a specific route */
/** 6) Use the .env file to configure the app */
require('dotenv').config();

app.get('/json', function(req, res, next){
    let message = 'Hello json';

    if( process.env.MESSAGE_STYLE === 'uppercase' ){
        message = message.toUpperCase();
    }
    
    res.json({message: message});
});



/** 8) Chaining middleware. A Time server */
app.get('/now', 
    function(req, res, next){
        req.time = new Date().toString();
        next();
    }, 
    function(req, res, next){
        res.json({time: req.time});
});

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function(req, res, next){
    res.json({echo: req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name', function(req, res, next){
    const fullname = `${req.query.first} ${req.query.last}`;
    res.json({name: fullname});
});
  
/** 12) Get data form POST  */
app.post('/name', function(req, res, next){
    const fullname = `${req.body.first} ${req.body.last}`;
    res.json({name: fullname});
})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
