import { Bag } from '../models/bag.js';

export const getNumPages = async (req, res) => {
    try {
        let allBags = await Bag.countDocuments();
        let jsonBag = JSON.stringify(allBags);
        return res.send(jsonBag);
    }

    catch (err) {
        return res.status(400).send("an error occurred " + err);
    }
}
