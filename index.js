const express = require ('express');
const app = express();
const path = require ('path');
const indexRoutes = require('./src/routes/indexRoutes');
const session = require('express-session');
//const productRoutes = require('./src/routes/productRoutes');
//const userRoutes = require('./src/routes/userRoutes');
//const methodOverride= require('method-override');


app.use(session({
	secret: "It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.listen(process.env.PORT || 3000, function(){
    console.log('Servidor corriendo en puerto 3000');
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.resolve(__dirname , './public')));

//app.use(methodOverride('_method'));

app.set('view engine' , 'ejs');

app.use('/' , indexRoutes);

//app.use('/product' , productRoutes);

//app.use('/users' , userRoutes);

app.get("*", (req,res) => {
	res.redirect("/error")
})