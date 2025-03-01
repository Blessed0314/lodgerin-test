const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../../services/userService"); // Asegúrate de tener este servicio implementado

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Suponiendo que el rol del usuario está en user.role
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = loginController;
