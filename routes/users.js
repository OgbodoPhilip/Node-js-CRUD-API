import { Router } from "express";
const router = Router();
import { createUser,getUser,getUsers,deleteUser,updateUser } from "../controllers/userController.js";


router.post("/",createUser);
router.get("/",getUsers);


router.get("/:id",getUser);
router.patch("/:id",updateUser);
router.delete("/:id",deleteUser);


export default router;