import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./router.js";
const app = express();

const PORT = process.env.PORT || 8000;

mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		console.log(`DB is connected`);
	})
	.catch((error) => {
		console.log(`Error is coming while connectiong DB ${error}`);
	});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);

app.listen(PORT, () => {
	console.log(`server is listening at port ${PORT}`);
});
