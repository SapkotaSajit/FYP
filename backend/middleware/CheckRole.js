export const checkAdminRole = (req, res, next) => {
  if (req.role_id === 1) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access forbidden for non-admin users" });
  }
};

export const checkUserRole = (req, res, next) => {
  if (req.role_id === 1 || req.role_id === 2) {
    next();
  } else {
    return res.status(403).json({ message: "Access forbidden for this role" });
  }
};

export const checkStaffRole = (req, res, next) => {
  if (req.role_id === 1 || req.role_id === 3) {
    next();
  } else {
    return res.status(403).json({ message: "Access forbidden for this role" });
  }
};
