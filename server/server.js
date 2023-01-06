const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const ProductRouter = require("../server/Routers/product");
const path = require("path");


/* --------------------------- DATABASE CONNECTION -------------------------- */

const { connectDb } = require("../server/helpers/connect");
connectDb();

/* ------------------------------- MIDDLEWARES ------------------------------ */
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/", ProductRouter);

/* ---------------------------------- PORT ---------------------------------- */

app.listen(5000, () => console.log(`server is running on port 5000`));
