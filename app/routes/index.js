"use strict";

import * as express from "express";
import * as indexController from "../controllers/index_controller";

const env = process.env.NODE_ENV || "development";
const router = express.Router();

router.get("/filters/", indexController.getFilterList);
router.get("/orders/", indexController.getOrderList);
router.get("/orderdetails/", indexController.getOrderDetailList);

export default router;
