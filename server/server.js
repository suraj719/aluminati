const express = require("express");
const cors = require("cors");
const connectDB = require("./Connection");
const alumniRoutes = require("./routes/alumniRoutes");
const startupRoutes = require("./routes/startupRoutes");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json({ limit: "50mb" }));
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World!!");
});
app.use("/api/alumni", alumniRoutes);
app.use("/api/startup", startupRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("db connected successfully");
    app.listen(port, console.log(`server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
