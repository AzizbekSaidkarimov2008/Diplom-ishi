const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const fileUpload = require("../middleware/fileUpload");
const AuthRegister = require("../models/AuthRegister");
const toDelete = require("../middleware/toDelete");
const nodehbs = require("nodemailer-express-handlebars");

router.get("/view", auth, async (req, res) => {
  const apply = await AuthRegister.find();
  res.render("admin/apply", {
    header: "Mahsulotlarni ko`rish",
    title: "Mahsulotlar",
    layout: "admin",
    apply,
    isActive: true,
  });
});

// ================================================= create

router.get("/", auth, (req, res, next) => {
  res.render("auth/register", {
    title: "Register",
    layout: "layout",
  });
});

router.post("/", auth, fileUpload.single("profileImg"), async (req, res) => {
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
  const { profileImg } = await AuthRegister.findById(req.params.id);
  toDelete(profileImg);
  await AuthRegister.findByIdAndDelete(req.params.id);
  res.redirect("/create/view");
});
// =============================================== send mail

router.get("/sendMail/:id", async (req, res) => {
  const email = await AuthRegister.findById(req.params.id);
  // const { email } = req.body;
  // const apply = await AuthRegister.findOne(email);
  res.render("admin/sendMail", {
    email,
    title: "Email",
    layout: "admin",
  });
});

router.post("/sendMail/:id", async (req, res) => {
  const { email } = await AuthRegister.findById(req.params.id);
  // const nodemail = await AuthRegister.findOne();
  // const mailjet = require ('node-mailjet')
  // .connect('****************************1234', '****************************abcd')
  // const request = mailjet
  // .post("send", {'version': 'v3.1'})
  // .request({
  //   "Messages":[
  //     {
  //       "From": {
  //         "Email": "saidkarimov014@gmail.com",
  //         "Name": "Azizbek"
  //       },
  //       "To": [
  //         {
  //           "Email": "saidkarimov014@gmail.com",
  //           "Name": "Azizbek"
  //         }
  //       ],
  //       "Subject": "Greetings from Mailjet.",
  //       "TextPart": "My first Mailjet email",
  //       "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
  //       "CustomID": "AppGettingStartedTest"
  //     }
  //   ]
  // })
  // request
  //   .then((result) => {
  //     console.log(result.body)
  //   })
  //   .catch((err) => {
  //     console.log(err.statusCode)
  //   })

  res.redirect("/create/view");
});

module.exports = router;
