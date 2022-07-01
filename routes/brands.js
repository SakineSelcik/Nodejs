    const mongoose = require('mongoose');
    const express = require('express');
    const router = express.Router();
    const Brands = require('../models/Brands');

    router.get('/' , (req , res) => {
        const promise = Brands.aggregate([

            {
                $lookup:{
                    from: 'suppliers',
                    localField: 'supplier_id',
                    foreignField: '_id',
                    as: 'suppliers'
                }
            },
            {
                $unwind:{
                    path:'$suppliers',
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);
        promise.then((data) => {
            res.json(data);
        })
            .catch((err)=>{
                res.json(err);
            })

    });


    router.get('/:_id' , (req , res , next) => {
        const promise = Brands.findById(req.params.id);
        /*const promise = Brands.aggregate([
            {
                $match:{
                    '_id': mongoose.Types.ObjectId(req.params._id)
                }
            },
            {
                $lookup:{
                    from: 'products',
                    localField: '_id',
                    foreignField: 'brand_id',
                    as: 'products'
                }
            },
            {
                $unwind:{
                    path:'$products',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group:{
                    _id:{
                        _id:'$_id',
                        name:'$name',
                    },
                    products:{
                        $push: '$products'
                    }
                }
            },
            {
                $project:{
                    _id:'$_id._id',
                    name:'$_id.name',
                    products:'$products'
                }
            }
        ]);*/
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
        const brands = new Brands(data);
        const promise =  brands.save();

        promise.then((data)=>{
            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })

    })


    router.put('/:_id' , (req , res, next) => {
        const promise = Brands.findByIdAndUpdate(req.params._id , req.body , {new:true});

        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir Marka bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    })


    router.delete('/:_id' , (req , res , next) => {
        const promise = Brands.findByIdAndRemove(req.params._id);

        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir Marka bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })

    })




    module.exports = router;