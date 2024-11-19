import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import connectDb from "./config/db.js";
import employeeRoutes from "./routes/employeeRoute.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const port = process.env.PORT || 4000;

connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoute);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) =>  {
    res.send("Server is Running Successfully")
})

app.listen(port, () => {
    console.log(`Server Started on PORT http://localhost:${port}`);
});
