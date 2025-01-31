import express from "express";
import {
  addStock,
  deleteStock,
  getAllStocks,
  getStockById,
  updateStock,
} from "../controllers/stockController.js";
import upload from "../middlewares/upload.js";
import authenticate from "../middlewares/authenticate.js";

const stockRouter = express.Router();

stockRouter.route("/add").post(upload.single("coverphoto"), addStock);
stockRouter.route("/all/get").get(getAllStocks);
stockRouter.route("/get/:id").get(getStockById);
stockRouter
  .route("/update/:id")
  .post(authenticate, upload.single("coverphoto"), updateStock);
stockRouter.route("/delete/:id").delete(deleteStock);

export default stockRouter;
