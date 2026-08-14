// Authorization helpers layered on top of verifyToken.
// verifyToken only proves the request carries a validly-signed JWT; these
// middlewares check that the token's identity is actually allowed to touch
// the resource being requested (role and/or ownership of the :id param).

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, msg: "Access Denied: insufficient privileges" });
    }
    next();
  };
}

// Ensures the authenticated user's own id matches the :id route param.
// Use for endpoints scoped to "your own account" (profile update, change
// password, etc). Pass allowRoles (e.g. ["admin"]) to let a privileged
// role read/act on behalf of others - only do this where that's actually
// the intended behavior (e.g. an admin panel viewing any candidate).
function requireSelf(paramName = "id", allowRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, msg: "Access Denied" });
    }
    if (allowRoles.includes(req.user.role)) {
      return next();
    }
    const paramValue = String(req.params[paramName]);
    if (req.user.id !== paramValue) {
      return res.status(403).json({ success: false, msg: "Access Denied: not the resource owner" });
    }
    next();
  };
}

module.exports = { requireRole, requireSelf };
