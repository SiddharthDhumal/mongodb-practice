import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./router.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import compression from "compression";

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

const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests for this Ip, please try again in an hour",
});

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(helmet());
app.use("/api", limiter);
app.use(mongoSanitize());
app.use(xss());
// app.use(
// 	hpp({
// 		whitelist: [
// 			"duration",
// 			"ratingsQuantity",
// 			"ratingsAverage",
// 			"maxGroupSize",
// 			"difficulty",
// 			"price",
// 		],
// 	})
// );

app.use(compression());

// Test middleware
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	// console.log(req.cookies);
	next();
});

app.use("/api", userRouter);

app.listen(PORT, () => {
	console.log(`server is listening at port ${PORT}`);
});
