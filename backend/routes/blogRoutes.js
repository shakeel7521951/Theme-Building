import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import {
  addBlog,
  getBlog,
  delBlog,
  updateBlog,
} from "../controllers/blogController.js";

const blogRouter = Router();

blogRouter.route("/add").get(authenticate, getBlog);

blogRouter
  .route("/add")
  .post(authenticate, upload.single("coverphoto"), addBlog);

blogRouter.route("/:id").get(authenticate, updateBlog);
blogRouter.route("/:id").delete(authenticate, delBlog);

export default blogRouter;
