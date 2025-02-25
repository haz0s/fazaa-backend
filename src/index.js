
//modules
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
//routes
const usersRouter = require("./router/usersRouter");
const authRouter = require("./router/authRouter");
const servicesRouter = require("./router/servicesRouter");
const reportsRouter = require("./router/reportsRouter");
//utils
const httpRespone = require("./utils/httpRespone");

//connect to DataBase


// Initialize Express app
const app = express();

app.use(cors());
app.use(express.json());

//APIs
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/service", servicesRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));


const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Sync the database
        console.log('Database & tables synchronized successfully!');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};

// Call the sync function
syncDatabase();

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
