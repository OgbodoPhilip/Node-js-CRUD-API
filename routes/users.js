import { Router } from "express";
const router = Router();
import { createUser,getUser,getUsers,deleteUser,updateUser,loginUser ,logoutUser,getUserProfile} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.use((req,res,next)=>{
  console.log('getting all the users')
  next()
})

router.post("/",createUser);
router.get("/",getUsers);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/profile",isAuthenticated,getUserProfile);
router.get("/:id",getUser);
router.patch("/:id",updateUser);
router.delete("/:id",deleteUser);


export default router;