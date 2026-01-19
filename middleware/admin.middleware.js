const isAdminUser = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Admins only resource",
    });
  }
  next();
};

export default isAdminUser;
