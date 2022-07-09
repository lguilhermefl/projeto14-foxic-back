import getToken from "../utils/getToken.js";
import db from './../db.js';
import { ObjectId } from "mongodb";

export default async function(req, res, next){

    const token = getToken(req.headers);
    if(!req.session) req.session = {};
    if(!req.session.user) req.session.user = {};

    console.log('token antes ', token);

    if(token){

        const sessionRegister = await db.collection('sessions').findOne({ token });

        if(sessionRegister) {

            const userData = await db.collection('users').findOne({ _id: sessionRegister.userId });
            req.session.user = userData;
            req.session.token = token;

        }
        
        next();

    } else {
        next();
    }

};