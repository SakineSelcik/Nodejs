    const express = require('express')
    const router = express.Router()
    const Products = require('../models/Products')
    const Brands = require("../models/Brands");
    const mongoose = require("mongoose");




    router.get('/', (req, res, next)=>{
        const promise = Products.find();
        promise.then((data)=>{
            if(!data) next({ message: 'Böyle bir  ürün bulunamadı'});

            res.json(data);
        }).catch((err)=>{
            res.json(err);
        })
    })


    /*router.get('/:category_id' , (req , res , next) => {

        const promise = Products.aggregate([

            {
                $match:{
                    'category_id': mongoose.Types.ObjectId(req.params.category_id)
                }
            },
            {
                $lookup:{
                    from: 'categorys',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'categorys'
                }
            },
            {
                $unwind:{
                    path:'$categorys',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group:{
                    _id:{
                        _id:'$_id',
                        name:'$name',
                    },
                    categorys:{
                        $push: '$categorys'
                    }
                }
            },
            {
                $project:{
                    _id:'$_id._id',
                    name:'$_id.name',
                    categorys:'$categorys'
                }
            }

        ]);
        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir ürün bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    }) */


    router.get('/:brand_id' , (req , res , next) => {
        const PerPage = 2
        const page = req.query.page || 1
        const promise = Products.aggregate([

            {
                $match:{
                    'brand_id': mongoose.Types.ObjectId(req.params.brand_id)
                }
            },
            {
                $lookup:{
                    from: 'products',
                    localField: 'brand_id',
                    foreignField: '_id',
                    as: 'products'
                }
            },
            {
                $unwind:{
                    path:'$products',
                    preserveNullAndEmptyArrays: true
                }
            },

        ]).skip((PerPage * page) - PerPage).limit(PerPage);
        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir ürün bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    })


    router.get('/:brand_id/:supplier_id' , (req , res , next) => {
        const PerPage = 2
        const page = req.query.page || 1
        const promise = Products.aggregate([

            {
                $match:{
                    'brand_id':mongoose.Types.ObjectId(req.params.brand_id),
                    'supplier_id': mongoose.Types.ObjectId(req.params.supplier_id)
                }
            },
            {
                $lookup:{
                    from: 'products',
                    localField: 'supplier_id',
                    foreignField: '_id',
                    as: 'products'
                }
            },
            {
                $unwind:{
                    path:'$products',
                    preserveNullAndEmptyArrays: true
                }
            },

        ]).skip((PerPage * page) - PerPage).limit(PerPage).sort({price: 1});
        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir ürün bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    })


    router.get('/price/:brand_id' , (req , res , next) => {
        const PerPage = 2
        const page = req.query.page || 1
        const promise = Products.aggregate([

            {
                $match:{
                    'brand_id': mongoose.Types.ObjectId(req.params.brand_id)
                }
            },
            {
                $lookup:{
                    from: 'products',
                    localField: 'brand_id',
                    foreignField: '_id',
                    as: 'products'
                }
            },
            {
                $unwind:{
                    path:'$products',
                    preserveNullAndEmptyArrays: true
                }
            },

        ]).skip((PerPage * page) - PerPage).limit(PerPage).sort({price: 1});
        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir Ürün bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    })


    router.get('/:variant_id', (req , res , next) => {
        const PerPage = 2
        const page = req.query.page || 1
        const promise = Products.aggregate([

            {
                $match:{
                    'brand_id': mongoose.Types.ObjectId(req.params.brand_id)
                }
            },
            {
                $lookup:{
                    from: 'products',
                    localField: 'brand_id',
                    foreignField: '_id',
                    as: 'products'
                }
            },
            {
                $unwind:{
                    path:'$products',
                    preserveNullAndEmptyArrays: true
                }
            },

        ]).skip((PerPage * page) - PerPage).limit(PerPage);
        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir ürün bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })

    })

    router.post('/' , (req , res) => {
       const data = req.body;
       const product = new Products(data);
       const promise =  product.save();

       promise.then((data)=>{
           res.json(data);
       })
           .catch((err) => {
           res.json(err);
       })

    })


    router.put('/:id' , (req , res , next) => {
        const promise = Products.findByIdAndUpdate(req.params.id , req.body , {new:true});

        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir ürün bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })
    })


    router.delete('/:id' , (req , res , next) => {
        const promise = Products.findByIdAndRemove(req.params.id);

        promise.then((data) => {
            if(!data) next({ message: 'Böyle bir ürün bulunamadı'});

            res.json(data);
        })
            .catch((err) => {
                res.json(err);
            })

    })




    module.exports = router;