import { User } from "./model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class userController {
	static async register(req, res) {
		const { name, email, password } = req.body;

		try {
			const newUser = new User({
				name,
				email,
				password,
			});

			await newUser.save();

			return res.json({ newUser, message: "new user created successfully" });
		} catch (error) {
			console.log(`Error while registering user ${error}`);
			return res.json({ message: `Error while registering user ${error}` });
		}
	}

	static async login(req, res) {
		try {
			// const user = await User.findById(req.params.id);

			const { email, password } = req.body;

			if (!email || !password) {
				return res
					.status(400)
					.json({ msg: "Please provide both email and password" });
			}

			const user = await User.findOne({ email });

			if (!user) {
				return res.status(404).json({ msg: "User not found" });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: "Invalid credentials" });
			}

			const token = jwt.sign(
				{ userId: user._id, name: user.name, email: user.email },
				process.env.JWT_SECRET_KEY,
				{ expiresIn: "2d" }
			);

			return res.status(200).json({ msg: "Authentication successful", token });
		} catch (error) {
			console.log(`Error while logging user ${error}`);
			return res.json({ message: `Error while logging user ${error}` });
		}
	}

	static async getAllUsers(req, res) {
		try {
			const allUsers = await User.find();

			return res.json({ allUsers });
		} catch (error) {
			return res.json({ message: `Error while getting all users ${error}` });
		}
	}

	static async getUserById(req, res) {
		try {
			const user = await User.findById(req.params.id);
			if (user) {
				return res.json(user);
			} else {
				return res.json({ message: `No User found` });
			}
		} catch (error) {
			return res.json({ message: `Error while getting user ${error}` });
		}
	}

	static async updateUser(req, res) {
		try {
			const { name, email, password } = req.body;
			const user = await User.findById(req.params.id);

			if (!user) {
				return res.status(404).json({ msg: "User not found" });
			}

			user.name = name || user.name;
			user.email = email || user.email;
			user.password = password || user.password;

			await user.save();
			return res.status(200).json({ msg: "User updated successfully", user });
		} catch (error) {
			console.error(err.message);
			return res.status(500).json({ msg: "Server Error" });
		}
	}

	static async deleteUser(req, res) {
		try {
			const user = await User.findByIdAndDelete(req.params.id);
			if (!user) {
				return next(new AppError("No user found with that ID", 404));
			}

			res.status(204).json({
				status: "success",
				data: null,
			});
		} catch (error) {
			console.error(error.message);
			return res.status(500).json({ msg: "Server Error" });
		}
	}
}
