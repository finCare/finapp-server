const express = require("express");

const router = express.Router();
const RESPONSE = require(`${__BASE__}modules/controller/handler/ResponseHandler`);
const UserController = require(`${__BASE__}modules/controller/UserController`);
const validator = require("validator");
const passport = require("passport");

router.post("/signup", (req, res) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long"
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
  if (req.body.firstname === undefined)
    validationErrors.push({ msg: "Firstname not available" });
  if (req.body.lastname === undefined)
    validationErrors.push({ msg: "Lastname not available" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/signup");
  }

  const parameters = {};

  parameters.email = req.body.email;
  parameters.password = req.body.password;
  parameters.firstname = req.body.firstname;
  parameters.lastname = req.body.lastname;

  UserController.signupUser(parameters.email, parameters)
    .then(data => {
      if (data) {
        RESPONSE.sendOkay(res, { status: "Success", message: data });
      }
    })
    .catch(err => {
      RESPONSE.sendOkay(res, {
        status: "Failure",
        message: "Error in signing up the user"
      });
    });
});

router.post("/login", (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long"
    });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false
  });

  const parameters = {};

  parameters.email = req.body.email;
  parameters.password = req.body.password;

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, err => {
      console.log("user:", user);
      if (err) {
        return next(err);
      }
      RESPONSE.sendOkay(res, { status: "Success", message: user });
    });
  })(req, res, next);
});

module.exports = router;
