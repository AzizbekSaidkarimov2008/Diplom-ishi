const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const fileUpload = require("../middleware/fileUpload");
const AuthRegister = require("../models/AuthRegister");
const toDelete = require("../middleware/toDelete");

router.get("/view", auth, async (req, res) => {
  const apply = await AuthRegister.find();
  res.render("admin/apply", {
    header: "Mahsulotlarni ko`rish",
    title: "Mahsulotlar",
    layout: "admin",
    apply,
    isActive: true 
  });
  // res.send('asdasdasd')
});

// ================================================= create

router.get("/", auth, (req, res, next) => {
  res.render("auth/register", {
    title: "Register",
    layout: "layout",
  });
});

router.post("/", auth, fileUpload.single("profileImg"), async (req, res) => {
  // try {
  //   const {
  //     name,
  //     course,
  //     number,
  //     situation,
  //     disabled,
  //     agree,
  //     address,
  //     gender,
  //     faculty,
  //     email,
  //   } = req.body;
  //   req.file ? (profileImg = req.file.filename) : (profileImg = "");

  //   const candidate = await AuthRegister.findOne({
  //     name,
  //     course,
  //     number,
  //     situation,
  //     disabled,
  //     agree,
  //     address,
  //     gender,
  //     faculty,
  //     email,
  //   });

  //   if (!candidate) {
  //     req.flash("registerError", "Login is busy");
  //     res.redirect("/");
  //   } else {
  //     const authRegister = new AuthRegister({
  //       name,
  //       course,
  //       number,
  //       situation,
  //       disabled,
  //       agree,
  //       address,
  //       gender,
  //       profileImg,
  //       faculty,
  //       email,
  //     });

  //     await authRegister.save();
  //     req.flash("success", "Admin is registreted successfull");
  //     res.redirect("/");
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  // const authRegister = new AuthRegister(req.body);

  const {
    name,
    course,
    number,
    situation,
    disabled,
    agree,
    address,
    gender,
    faculty,
    email,
  } = req.body;
  req.file ? (profileImg = req.file.filename) : (profileImg = "");
  console.log(req.body);

  const candidate = new AuthRegister({
    name,
    course,
    number,
    situation,
    disabled,
    agree,
    address,
    gender,
    faculty,
    email,
    profileImg,
  });
  await candidate.save();
  res.redirect("/");
});

// ================================================= edit

router.get("/edit/:id", async (req, res) => {
  const apply = await AuthRegister.findById(req.params.id);
  res.render("admin/registerEdit", {
    apply,
    header: "Mahsulotlarni yangilash",
    title: "Mahsulotlarni yangilash",
    layout: "layout",
  });
});

router.post("/edit/:id", fileUpload.single("profileImg"), async (req, res) => {
  const { profileImg } = await AuthRegister.findById(req.params.id);
  const apply = req.body;

  if (req.file) {
    toDelete(profileImg);
    apply.profileImg = req.file.filename;
  }

  await AuthRegister.findByIdAndUpdate(req.params.id, apply);
  res.redirect("/create/view");
});

// =================================================== delete

router.get("/delete/:id", async (req, res) => {
  const { categoryIcon } = await AuthRegister.findById(req.params.id);
  await AuthRegister.findByIdAndDelete(req.params.id, toDelete(categoryIcon));
  res.redirect("/create/view");
});

module.exports = router;
