import express from "express";
import { signup, signin, signout } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/sign-up").post(signup);
userRouter.route("/sign-in").post(signin);
userRouter.route("/sign-out").post(signout);

export default userRouter;
