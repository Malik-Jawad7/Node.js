import express from "express";
import db from "./config/db.mjs";
import router from "./routes/index.mjs";

const app = express();

db.connection.once("open", () => {
    console.log("Database connected successfully");
    "error", (err) => {
        console.error("Database connection error:", err);
    }
});

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
}) 
app.use(express.json())
app.use('/',router);