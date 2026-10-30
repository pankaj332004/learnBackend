const rolePermissions = {
  admin: [
    "product:read",
    "product:create",
    "product:update",
    "product:delete"
  ],

  user: [
    "product:read"
  ]
};

function requirePermission(permission) {
  return (req, res, next) => {
    const userRole = req.user.role;

    const permissions = rolePermissions[userRole] || [];

    if (!permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: "Permission denied"
      });
    }

    next();
  };
}

module.exports = requirePermission;