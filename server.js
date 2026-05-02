import express from "express";
import connectDB from "./db.js";
import User from "./models/Users.js";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import multer from "multer";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();
const upload = multer()


app.use(upload.array())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req,res,next)=>{
  console.log('all routes middleware')
  next()
})


app.get("/", (req, res) => {
  res.send("Welcome to the Node.js and Express API with MongoDB!");
});
app.get("/error", (req, res) => {
  throw new Error("This is a test error")
});

app.post('/form',(req,res)=>{
console.log(req.body);
res.send("form received")

})


//routes
app.use("/users", userRoutes);





app.all('*path', (req, res) => {
  res.status(404).json({
    success: false,
    message: `The route ${req.originalUrl} does not exist on this server.`
  });
});

app.use((err,req,res,next)=>{
  console.error(err.message);
  res.send("Internal server error")
  next()
})


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
