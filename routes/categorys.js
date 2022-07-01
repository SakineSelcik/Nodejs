    const mongoose = require("mongoose");
    const express = require('express');
    const router = express.Router();
    const Categorys = require('../models/Categorys');



    router.get('/' , (req , res) => {
        const promise = Categorys.find();

        promise.then((data) => {
            res.json(data);
        })
            .catch((err)=>{
                res.json(err);
            })

    });


    router.get('/:_id' , (req , res , next) => {
        const promise = Categorys.findById(req.params._id);

        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir Category bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    })



    router.post('/' , (req , res) => {
        const data = req.body;
        const category= new Categorys(data);
        const promis =  category.save();

        promis.then((data)=>{
            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })

    })


    router.put('/:id' , (req , res) => {
        const promis = Categorys.findByIdAndUpdate(req.params.id , req.body , {new:true});

        promis.then((data) => {
            if(!data) next({ message: 'Böyle bir Category bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    })


    router.delete('/:id' , (req , res) => {
        const promis = Categorys.findByIdAndRemove(req.params.id);

        promis.then((data) => {
            if(!data) next({ message: 'Böyle bir Category bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })

    })




    module.exports = router;