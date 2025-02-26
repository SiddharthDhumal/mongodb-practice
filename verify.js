import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			const token = req.headers.authorization.split(" ")[1];

			if (!token) {
				return res.status(401).json({ msg: "No token, authorization denied" });
			}

			const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
			req.user = decodedUser;
		} else {
			return res.json("authentication required !");
		}

		next();
	} catch (error) {
		return res.json({ msg: "Something went wrong !!" });
	}
};
