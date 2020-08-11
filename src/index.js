const express = require("express");
const expressHbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const User = require("./models/userModel");
const { compareHash } = require("./utils/hash");
const { sign } = require("./utils/jwtService");
const cookieParser = require("cookie-parser");
const passiveAuth = require("./middleware/passiveAuth");
const auth = require("./middleware/auth");
const alreadyLogin = require("./middleware/alreadyLogin");
const Friend = require("./models/friendModel");
const app = express();
//id password
// user 1
// id --> paarth@gmail.com
// pass --> 304304

// user 2
// id --> test123@test.com
// pass --> test

// Creating handlebars engine
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials")
});

// Let express know to use handlebars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

const getFriends = async (id) => {
  const result = await Friend.findAll({
    where: {
      userId: id
    }
  });
  return JSON.parse(JSON.stringify(result));
};

app.get("/", passiveAuth, (req, res) => {
  res.status(200).render("home.hbs", {
    layout: "hero",
    isUser: req.jwt ? req.jwt.sub === "user" : false
  });
});

app.get("/login", alreadyLogin, (req, res) => {
  res.status(200).render("login.hbs", {
    layout: "hero",
    submitTarget: "/login",
    submitMethod: "POST"
  });
});

//user login authentication
let userid;
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const result = await User.findOne({ where: { email: email } });
  // console.log(result)
  const user = result.get();
  // console.log(user)

  if (user) {
    const isValidPassword = compareHash(password, user.password);
    userid = user.id;
    if (isValidPassword) {
      const token = sign({
        sub: "user",
        email
      });
      res.cookie("jwt", token, { httpOnly: true });
      res.status(200).redirect("/friends");
    } else {
      res.status(401).send("Invalid User");
    }
  } else {
    res.status(401).send("Invalid User");
  }
});

app.get("/friends", auth, async (req, res) => {
  console.log(userid);
  res.status(200).render("friends", {
    layout: "hero",
    uid: userid,
    data: await getFriends(userid)
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

app.listen(3000);
