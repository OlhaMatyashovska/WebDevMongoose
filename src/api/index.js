import {Router} from "express";
import companyRouter from "./company";

const apiRouter = new Router();

apiRouter.use("/company", companyRouter);

export default apiRouter;