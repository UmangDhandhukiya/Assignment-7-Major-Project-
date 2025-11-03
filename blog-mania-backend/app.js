const express = require("express");
const cors = require("cors");
const connectDb = require("./configs/db");
const adminRouter = require("./routes/adminRoutes");
const blogRouter = require("./routes/blogRoutes");
const categoryRouter = require("./routes/categoryRoutes");
require("dotenv").config();

const app = express();
const port = 5000;

//Middleware
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("api is working");
});

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);

//serverStart
async function startServer() {
  await connectDb();
  app.listen(port, () => {
    console.log("server is running on " + port);
  });
}

startServer();

module.exports = app;
