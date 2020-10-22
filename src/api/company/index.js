import {Router} from "express";
// import passport from "passport";
import companyControler from "./controller";

const companyRouter = new Router();
companyRouter.get("/", companyControler.get);
companyRouter.post("/",/*passport.authenticate("jwt", {session:false}),*/ companyControler.post);
companyRouter.get("/:id", companyControler.getById);
companyRouter.delete("/:id",  /*passport.authenticate("jwt", {session:false}),*/ companyControler.delete);
companyRouter.patch("/:id",  /*passport.authenticate("jwt", {session:false}),*/companyControler.patch);
companyRouter.get("/", companyControler.get_async);
export default companyRouter;