    const mongoose = require("mongoose");
    const express = require('express');
    const router = express.Router();
    const Variants = require('../models/Variants');



    router.get('/' , (req , res) => {
        const promise = Variants.find();

        promise.then((data) => {
            res.json(data);
        })
            .catch((err)=>{
                res.json(err);
            })

    });


    router.get('/:_id' , (req , res , next) => {
        const promise = Variants.findById(req.params._id);
        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir Variant bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    })



    router.post('/' , (req , res) => {
        const array = req.body.details.split(" ")
        const variant= new Variants( {name: req.body.name, details: array });
        const promis =  variant.save();

        promis.then((data)=>{
            req.json(data);
        })
            .catch((err) => {
                res.json(err);
            })

    })




    router.put('/:id' , (req , res) => {
        const promis = Variants.findByIdAndUpdate(req.params.id , req.body , {new:true});

        promis.then((data) => {
            if(!data) next({ message: 'Böyle bir Variant bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    })


    router.delete('/:id' , (req , res) => {
        const promis = Variants.findByIdAndRemove(req.params.id);

        promis.then((data) => {
            if(!data) next({ message: 'Böyle bir Variant bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })

    })




    module.exports = router;