/**
 * @desc the entry point
 * @author Sandip Vaghasiya
 * @since 28 May 2022
 */

const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
router.get("/", (req, res) => {
    res.send("App is running..");
});
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);

require('dotenv').config({ path: './.env' });
require('./server.js');