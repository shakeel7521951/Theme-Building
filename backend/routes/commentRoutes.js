import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { addComment, deleteComment } from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.post("/add/:id", authenticate, addComment);

commentRouter.delete("/delete/:id", authenticate, deleteComment);

export default commentRouter;
