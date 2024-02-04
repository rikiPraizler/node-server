import mongoose from "mongoose";

export const connectToDB = () => {
    const mongoURI = process.env.DB_CONNECTION;
    mongoose.connect(mongoURI);
    try {
        console.log("mongoDB connected");
    }
    catch (err) {
        console.log("cannot connect mongoDB");
        console.log(err);
        process.exit(1);
    }
}