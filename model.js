import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		trim: true,
	},
	email: {
		type: String,
		lowercase: true,
		required: [true, "Email is required "],
		unique: [true, "Email Id must be unique"],
	},
	password: {
		type: String,
		required: [true, "Please provide password"],
		minlength: 8,
		// select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

export const User = mongoose.model("User", userSchema);

// module.export = User;
