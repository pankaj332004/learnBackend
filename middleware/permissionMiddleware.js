const rolePermissions = {
  customer: [
    "product:read",
    "cart:manage",
    "order:create",
    "order:read:own",
    "profile:update:own"
  ],

  seller: [
    "product:read",
    "product:create",
    "product:update:own",
    "product:delete:own",
    "order:read:seller"
  ],

  admin: [
    "product:read",
    "product:create",
    "product:update",
    "product:delete",
    "user:manage",
    "order:manage",
  ]
};

function requirePermission(permission) {
  return (req, res, next) => {

    if(!req.user){
      return res.status(401).json(
        errorResponse("Please log in first")
      );
    }

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