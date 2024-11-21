import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json()); 
app.use("/api/users", userRoutes);
 
app.listen(PORT, async () => {
    try {
        connectDB();
        console.log("Server started at http://localhost:" + PORT);
    } catch (error) {
        console.log(error)
    }
   
});
