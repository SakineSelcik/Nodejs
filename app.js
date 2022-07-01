    const express= require('express');
    const app = express();
    const productsRouter = require('./routes/products');
    const suppliersRouter = require('./routes/suppliers');
    const brandsRouter = require('./routes/brands');
    const categorysRouter = require('./routes/categorys');
    const variantsRouter = require('./routes/variants');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');

    const userName = 'Sakine';
    const parola = 'Sakine*99';

    mongoose.connect(`mongodb+srv://${userName}:${parola}@deneme.e0bh6.mongodb.net/restful_API` ,
        (err) => {
             if(err) console.log('Bağlantı başarısız' + err);
            else console.log('VeriTabanı Bağlantısı Başarılı');
        }
        );


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));



   /* const isLoggedIn = true;
    app.use('/' , (req , res , next) => {
        if(!isLoggedIn) res.send('lütfen giriş yapınız');
        else next();
    })

    app.get('/' , (req , res) => {
        res.send('HELLOO :)')
    }) */
    app.use('/products' , productsRouter);
   app.use('/suppliers' , suppliersRouter);
    app.use('/brands' , brandsRouter);
    app.use('/categorys' , categorysRouter);
    app.use('/variants' , variantsRouter);
    app.listen(3000);

    app.use((err,req,res,next)=>{
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err: {};

        res.status(err.status || 500);
        res.json({error: err.message});
    })

    module.exports = app ;