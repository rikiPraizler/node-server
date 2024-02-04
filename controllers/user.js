import { createToken } from "../config/jwt.js";
import { User, addUserValidator, loginUserValidator } from "../models/user.js";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {

    let { userName, email, password } = req.body;
    if (!userName || !email || !password)
        return res.status(404).send("missing required parameter")
    let validate = addUserValidator(req.body);
    if (validate.error)
        return res.status(400).json(validate.error.details[0].message);

    try { 

        let mail = await User.find({ email });
        if (mail.length > 0)
            return res.status(409).send("this email already exists");
        let hashedPassword = await bcrypt.hash(password, 12);
        let newUser = await User.create({ userName, email, password: hashedPassword });
        let { _id, userName: un, role, email: e, enterDate } = newUser;
        let token = createToken(newUser);
        res.json({ _id, userName: un, email: e, role, token, enterDate });
    }
    catch (err) {
        res.status(400).send("unable to add this user " + err);
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password)
            return res.status(404).send("missing require parameter");
        let validate = loginUserValidator(req.body);
        if (validate.error)
            return res.status(400).send(validate.error.details[0].message);

        let findUser = await User.findOne({ email });
        if (!findUser)
            return res.status(404).send("email does not exist");
            
        let userPassword = bcrypt.compare(password, findUser.password);
        if (!userPassword) 
            return res.status(404).send("wrong password");
        let { userName: u, _id, email: e, role, enterDate } = findUser;
        let token = createToken(findUser);
        res.json({ _id, userName: u, token, email: e, role, enterDate }); 
    }
    catch (err) {
        res.status(500).send("an error occurred " + err);
    }
}

export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await User.find({}, "-password");
        res.json(allUsers);
    }
    catch (err) {
        res.status(500).send("An error occurred " + err.message);
    }
}