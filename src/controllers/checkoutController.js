import db from '../db.js';

async function saveOrder(req, res) {
    const { user, order } = req.session;

    try {
        await db.collection("orders").insertOne({ userId: user._id, ...order });
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
};

export default saveOrder;