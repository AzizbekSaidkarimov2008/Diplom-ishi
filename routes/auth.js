const { Router } = require("express");
const router = Router();
const Auth = require("../models/Auth");
const bcrypt = require("bcryptjs");
const AuthRegister = require("../models/AuthRegister");
const flash = require("connect-flash");
// const auth = require("../middleware/auth");
const fileUpload = require('../middleware/fileUpload')


// ======================================================== Login and Logout ==========================================

router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
    layout: "layout.hbs",
  });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    const candidate = await Auth.findOne({ login });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);

      if (areSame) {
        req.session.isAuth = true;
        res.redirect("/create");
      } else {
        res.redirect("/auth/login");
      }
    } else {
      res.redirect("/create");
    }
  } catch (error) {
    console.log(error);
  }
});

// ===================================================== registratsiyaForLogin =====================================

router.get("/registratsiyaForLogin", (req, res, next) => {
  res.render("auth/registratsiyaForLogin", {
    title: "Register",
    layout: "layout.hbs",
  });
});

router.post("/registratsiyaForLogin", async (req, res) => {
  try {
    const { login, password } = req.body;

    req.flash("registerError", "Login is busy");
    res.redirect("/auth/login");
    const hasPassword = await bcrypt.hash(password, 10);

    const authRegisterForLogin = new Auth({
      login,
      password: hasPassword,
    });

    await authRegisterForLogin.save();
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;