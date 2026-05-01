import express from "express";
import connectDB from "./db.js";
import User from "./models/Users.js";
import dotenv  from "dotenv";
import userRoutes from "./routes/users.js";
dotenv.config()
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

 

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Welcome to the Node.js and Express API with MongoDB!");
});

//routes
app.use('/users',userRoutes)








app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}); 