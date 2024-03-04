// routes/requestRoutes.js
import { getAllRequests, submitRequest } from "../controllers/RequestController.js";
import express from 'express';

const requestRouter = express.Router();

requestRouter.post("/submitrequest", submitRequest);
requestRouter.get("/getrequests", getAllRequests);

export { requestRouter };
