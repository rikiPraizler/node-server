import { Bag } from '../models/bag.js';

export const getNumPages = async (req, res) => {
    try {
        let allBags = await Bag.countDocuments();
        return res.send(allBags);
    }

    catch (err) {
        return res.status(400).send("an error occurred " + err);
    }
}
