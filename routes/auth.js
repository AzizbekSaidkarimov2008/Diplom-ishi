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
  // req.session.isAuth = false
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

// ===================================================== register ===========================================

// router.get(
//   "/register",
//   auth, (req, res, next) => {
//     res.render("auth/register", {
//       title: "Register",
//       layout: "layout.hbs",
//     });
//   }
// );

// router.post(
//   "/register",
//   auth,fileUpload.single('profileImg'), async (req, res) => {
//     try {
//       const {
//         name,
//         course,
//         number,
//         situation,
//         disabled,
//         agree,
//         address,
//         gender,
//         faculty,
//         email,
//       } = req.body;
//       req.file ? profileImg = req.file.filename : profileImg = ""

//       const candidate = await AuthRegister.findOne({
//         email,
//       });

//       if (candidate) {
//         req.flash("registerError", "Login is busy");
//         res.redirect("/");
//       } else {
//         const authRegister = new AuthRegister({
//           name,
//           course,
//           number,
//           situation,
//           disabled,
//           agree,
//           address,
//           gender,
//           profileImg,
//           faculty,
//           email,
//         });

//         await authRegister.save();
//         req.flash("success", "Admin is registreted successfull");
//         res.redirect("/");
//       }
//     } catch (error) {
//       console.log(error);
//     }

//     // const authRegister = new AuthRegister(req.body);
//   }
// );

module.exports = router;