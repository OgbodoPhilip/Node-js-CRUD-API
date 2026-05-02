import { Router } from "express";
const router = Router();
import { createUser,getUser,getUsers,deleteUser,updateUser } from "../controllers/userController.js";

router.use((req,res,next)=>{
  console.log('getting all the users')
  next()
})

router.post("/",createUser);
router.get("/",getUsers);


router.get("/:id",getUser);
router.patch("/:id",updateUser);
router.delete("/:id",deleteUser);


export default router;