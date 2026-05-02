export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }
};

// Usage in your routes:
// router.get('/dashboard', isAuthenticated, getDashboardData);