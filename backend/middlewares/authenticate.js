import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecret"
    );
    req.id = decoded._id;
    next();
  } catch (e) {
    console.error("Authentication error:", e.message);
  }
};

export default authenticate;
