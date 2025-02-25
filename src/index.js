//  modules
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
//  routes
const usersRouter = require("./router/usersRouter");
const authRouter = require("./router/authRouter");
const servicesRouter = require("./router/servicesRouter");
const reportsRouter = require("./router/reportsRouter");
//  utils
const httpRespone = require("./utils/httpRespone");
//  config
const { sequelize } = require("./config/sequelize");

//  connect to DataBase
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Sync the database
        console.log("Database & tables synchronized successfully!");
    } catch (error) {
        console.error("Error synchronizing the database:", error);
    }
};
syncDatabase();

//  Initialize Express app
const app = express();

app.use(cors());
app.use(express.json());

//  APIs
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/service", servicesRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

//  global middle ware for not found routes
app.all("*", (req, res, next) => {
    return res.status(404).json(httpRespone.badResponse(404, "API not found"));
});

//  global error handler
app.use((error, req, res, next) => {
    console.log("error: ", error);
    res.status(500).json(
        httpRespone.badResponse(500, `internal server error! ${error}!`)
    );
});

//  Start your server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
