import express from "express";   
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import { connectToDB } from "./config/dbConfig.js";
import bagRouter from "./routes/bag.js";
import cors from "cors";
import { errorHandling } from "./middlewares/errorHandling.js";
import orderRouter from "./routes/order.js";

config();  
connectToDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('images'));
app.use("/api/users", userRouter); 
app.use("/api/bags", bagRouter);
app.use("/api/orders", orderRouter);
  
app.use(errorHandling); 
let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
