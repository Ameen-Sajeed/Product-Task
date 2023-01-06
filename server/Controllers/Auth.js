const jwt = require("jsonwebtoken");

/* ------------------------------- ADMIN LOGIN ------------------------------ */

const adminLogin = (req, res) => {
  try {
    const { ADMIN_EMAIL, ADMIN_PWD } = process.env;
    const { email, password } = req.body;

    if (email == ADMIN_EMAIL && password == ADMIN_PWD) {
      const id = "8394n43x14n384n1njk";
      const token = jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: "365d",
      });
      res.status(200).json({ token: token, auth: true, msg: "login success" });
    } else {
      res.status(500).json("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json({ msg: "error occured" });
  }
};

module.exports = { adminLogin };
