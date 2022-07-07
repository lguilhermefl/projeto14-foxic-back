import db from '../db.js';
import staticProducts from './data/products.js';

export default async function () {

    const productsCollection = db.collection('products');
    const productsList = await productsCollection.find({}).toArray();
    if (productsList.length === 0) await productsCollection.insertMany(staticProducts);

};