import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

async function signUp(req, res) {
    const user = req.body;

    const isEmailRegistered = await db.collection("users").findOne({ email: user.email });

    if (isEmailRegistered) {
        return res.sendStatus(409);
    };

    try {
        const passwordHash = bcrypt.hashSync(user.password, 10);

        delete user.repeat_password;

        await db.collection("users").insertOne({ ...user, password: passwordHash });

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
};

async function signIn(req, res) {
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });

    try {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            await db.collection("sessions").insertOne({ token, userId: user._id });

            res.send(token);
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        res.status(500).send(error);
    }


};

export { signUp, signIn };