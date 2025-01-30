import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import {
  addBlog,
  getBlog,
  delBlog,
  updateBlog,
  getAllBlogs,
} from "../controllers/blogController.js";

const blogRouter = Router();

blogRouter.route("/get/:id").get(authenticate, getBlog);
blogRouter.route("/all/get").get(authenticate, getAllBlogs);

blogRouter
  .route("/add")
  .post(authenticate, upload.single("coverphoto"), addBlog);

blogRouter
  .route("/update/:id")
  .put(authenticate, upload.single("coverphoto"), updateBlog);
blogRouter.route("/delete/:id").delete(authenticate, delBlog);

export default blogRouter;
