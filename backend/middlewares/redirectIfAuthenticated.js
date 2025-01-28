const redirectIfAuthenticated = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (token) {
    return res.status(401).json({
      success: false,
      message: "User is already authenticated.",
    });
  }

  try {
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(403).json({
      success: false,
      message: "Access forbidden. Please sign in.",
    });
  }
};

export default redirectIfAuthenticated;
