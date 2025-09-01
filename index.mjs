import express from "express";
import db from "./config/db.mjs";
import router from "./routes/index.mjs";
import cros from 'cors'

const app = express();

db.connection.once("open", () => {
    console.log("Database connected successfully");
    "error", (err) => {
        console.error("Database connection error:", err);
    }
});

// app.listen(3000, ()=> {
//     console.log("Server is running on port 3000");
// }) 

app.get('/', (req, res) => {
    res.send('server is ready to use!');
});
app.use(cros())
app.use(express.json())
app.use('/',router);

export default app; 
