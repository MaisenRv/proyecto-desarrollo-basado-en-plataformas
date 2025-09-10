import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const users = [
  { id: 1, nombre: "Julian", email: "julian@gmail.com", password: "1234" },
];

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, "secreto123", {
    expiresIn: "1h",
  });

  res.json({ message: "Login exitoso", user, token });
});

export default router;
