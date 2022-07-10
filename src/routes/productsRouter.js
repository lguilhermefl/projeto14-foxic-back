import { Router } from 'express';
import db from './../db.js';

const router = Router();

router.get('/', async (req, res, next)=>{

    const { page, resultsPerPage } = req.query;
    const currentPage = page ? page : 1;
    const limit = resultsPerPage ? resultsPerPage : 8;
    const skip = ((currentPage - 1) * limit);

    const queryOptions = {
        skip
    };

    const productsCollection = db.collection('products');

    try {
     
        const products = await productsCollection.find({}, queryOptions).limit(limit).toArray();
        res.send(products);

    } catch (err) {
        console.log(err);
        res.status(500).send('Ocorreu um erro ao buscar os produtos.');
    }

});

router.get('/:productName', async (req, res, next)=>{

    const { productName } =  req.params;
    const productsCollection = db.collection('products');

    try {
        
        const product = await productsCollection.findOne({ name: productName });
        if(product) return res.send(product);
        res.sendStatus(404);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

});

export default router;