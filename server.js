const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const CONFIG = require('./config');
// const middleware = require('./middleware');

// app setup
const app = express();
app.use(express.static('public'));

// connect mongo
mongoose.connect(`mongodb://${CONFIG.db.username}:${CONFIG.db.password}@ds111618.mlab.com:11618/picase`);
mongoose.connection.on('connection',()=>console.log('Db connected!'));
mongoose.connection.on('error',err=>console.log('Db error in connected!',err));

// set cors
app.use(cors());

// body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// set views
app.set('views', path.join(__dirname,'views'));

// routes
let index = require('./routes/index');
let users = require('./routes/users');
app.use('/',index);
app.use('/users',users);
// app.get('*',(req,res)=>{
//     res.sendFile('index.html');
// });

// listen
const port = process.env.PORT || 8080;
app.listen(port,()=>console.log("Server started on "+port));