import jwt from "jsonwebtoken";

export const createToken = (user) => {
    let token = jwt.sign(
        { _id: user._id, userName: user.userName, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "20m"
        })
    return token;
}      