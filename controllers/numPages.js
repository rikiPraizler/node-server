import { Bag } from '../models/bag.js';

export const getNumPages = async (req, res) => {
    try {
        let allBags = await Bag.countDocuments();
        let perPage = req.query.perPage || 10;

        let numPages = Math.ceil(allBags / perPage)
        return res.json(numPages);
    }

    catch (err) {
        return res.status(400).send("an error occurred " + err);
    }
}