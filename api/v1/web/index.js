/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: Sandip Vaghasiya
 */
import { Router } from "express";
const app = Router();

import { decodeJwtTokenFn } from '../../../utilities/universal';
import contractor from "./contractor";
import customer from "./customer";
import product from "./product";

/*********** Combine all Routes ********************/
app.use("/contractor",contractor);
app.use("/customer", customer);
app.use("/product", decodeJwtTokenFn, product);


export default app;
