    const mongoose = require("mongoose");
    const express = require('express');
    const router = express.Router();
    const Supplier = require('../models/Suppliers');



    router.get('/' , (req , res) => {
        const promise = Supplier.find();
        promise.then((data) => {
            res.json(data);
        })
            .catch((err)=>{
                res.json(err);
            })

    });


    router.get('/:_id' , (req , res , next) => {
        const promise = Supplier.findById(req.params.id);
        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir Marka bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    })



    router.post('/' , (req , res) => {
        const data = req.body;
        const supplier= new Supplier(data);
        const promis =  supplier.save();

        promis.then((data)=>{
            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })

    })


    router.put('/:id' , (req , res) => {
        const promis = Supplier.findByIdAndUpdate(req.params.id , req.body , {new:true});

        promis.then((data) => {
            if(!data) next({ message: 'Böyle bir Tedarikçi bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    })


    router.delete('/:id' , (req , res) => {
        const promis = Supplier.findByIdAndRemove(req.params.id);

        promis.then((data) => {
            if(!data) next({ message: 'Böyle bir Tedarikçi bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })

    })




    module.exports = router;