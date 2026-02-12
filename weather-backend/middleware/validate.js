const { z } = require('zod');

// Login validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
};

module.exports = {
  validateLogin
};
