const express = require('express'); 
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const csrf = require('@dr.pogodin/csurf');
var cookieParser = require('cookie-parser')

const port = 3000;

app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(csrf({cookie:true}));

require('dotenv').config();

app.use(express.static('public'));

app.use(session({
    secret: 'guessyoudidnotseethatcoming',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@b303-arboiz.p20uafb.mongodb.net/formslinks?retryWrites=true&w=majority`,
        ttl: 7 * 24 * 60 * 60,
        autoRemove: 'native',
        dbName: 'formslinks',
        collectionName: 'sessions'
    }),
    cookie:{
        maxAge: 24 * 60 *60,
        sameSite:'lax'
    }
}))


const mainRoutes = require('./routes/main-routes');
const adminRoutes = require('./routes/admin-routes');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine','ejs');

app.use(express.json());

app.use((req,res,next)=>{
    const user = req.session?.user;
    const isAuthenticated = req.session?.isAuthenticated;
    if(!isAuthenticated || !user) {
        return next();
    }
    const isAdmin = user?.isAdmin;

    res.locals.isAuthenticated = isAuthenticated;
    res.locals.isAdmin = isAdmin; 
    next();
})

app.use(mainRoutes);
app.use(adminRoutes);

app.use((req,res)=>{
    res.status(404).render('404');
});

app.use((error,req,res,next)=>{
    res.status(500).render('500');
})


mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@b303-arboiz.p20uafb.mongodb.net/formslinks?retryWrites=true&w=majority`);

let database = mongoose.connection;

database.on('error',()=>console.log('Connection error:('));
database.once('open',()=>console.log('Connected to MongoDB!'));

app.listen(process.env.PORT || port,()=>{
    console.log(`The backend system for FormsLinks is now running at localhost:${process.env.PORT || port}`);
})

