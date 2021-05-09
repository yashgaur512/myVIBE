const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Problem = require("./models/problemModel");
const Expert = require("./models/expertModel");
const Experience = require("./models/expModel");
const ejsMate = require("ejs-mate");

const app = express();

mongoose.connect("mongodb://localhost:27017/myVIBE", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

let integrity = 0;

// mongoose
//   .connect("mongodb://localhost:27017/mental-awarness", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected!!!");
//   })
//   .catch((err) => {
//     console.log("Error!!!!in making connection!");
//   });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  e_mail: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// get requests

app.get("/", (req, res) => {
  res.render("signup.ejs");
});

app.post("/", function (req, res) {
  if (req.body.btn === "signup") {
    const user = new User({
      firstName: req.body.fName,
      lastName: req.body.lName,
      e_mail: req.body.mail,
      password: req.body.password,
    });

    user.save();
    res.redirect("/");
  }

  if (req.body.btn === "signin") {
    const email = req.body.mail2;
    const pass = req.body.password2;

    User.find(function (err, users) {
      if (err) console.log(err);
      else {
        for (i = 0; i < users.length; i++) {
          if (users[i].e_mail === email && users[i].password === pass) {
            integrity = 1;
          }
          // if(users[i].e_mail === "" && users[i].password === ""){
          //     integrity = 0;
          // };
        }

        if (integrity === 1) {
          res.redirect("/dashboard");
          //integrity = 0;
        } else {
          res.send("<h1>Authentication failed!</h1>");
        }
      }
    });
  }
  console.log(req.body);
});

app.get("/dashboard", (req, res) => {
  if (integrity === 1) {
    res.render("index.ejs");
  } else res.redirect("/");
});

app.get("/dashboard/problems", (req, res) => {
  res.render("problems/problems.ejs");
});

app.get("/dashboard/helper", (req, res) => {
  res.render("helper/helper.ejs");
});

app.get("/dashboard/cure", (req, res) => {
  res.render("cure/cure.ejs");
});

app.get("/dashboard/cure/common_ways", (req, res) => {
  res.render("cure/common_ways.ejs");
});

app.get("/dashboard/cure/exp_people", async (req, res) => {
  const allExperiences = await Experience.find({});
  res.render("cure/exp_people.ejs", { allExperiences });
});

app.get("/dashboard/allposts", async (req, res) => {
  const allPosts = await Problem.find({});
  res.render("allposts.ejs", { allPosts });
});
app.get("/dashboard/contact", (req, res) => {
  res.render("contact.ejs");
});

// post requests

app.post("/dashboard/allposts", async (req, res) => {
  const newProblem = new Problem(req.body);
  await newProblem.save();
  res.redirect("allposts");
});

app.post("/dashboard/problems", async (req, res) => {
  const newExpert = new Expert(req.body);
  await newExpert.save();
  res.redirect("/dashboard");
});

app.post("/dashboard/cure/exp_people", async (req, res) => {
  const newExperience = new Experience(req.body);
  await newExperience.save();
  res.redirect("/dashboard/cure/exp_people");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on 3000");
});
