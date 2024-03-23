const express = require("express");
const route = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

//custom Middleware for admin page
const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/login");
  }
};
//end of custom Middleware for admin page

const isAuthAdmin = (req, res, next) => {
  if (req.session.isAuth) {
    res.redirect("/admindash");
  } else {
    next();
  }
};

//custom MiddleWare for admin page
const isLoggedIn = (req, res, next) => {
  if (req.session.isLogged) {
    next();
  } else {
    res.redirect("/login");
  }
};

const isLoggedOut = (req, res, next) => {
  if (req.session.isLogged) {
    res.redirect("/");
  } else {
    next();
  }
};

//end of custom MiddleWare for admin page
route.get("/admindash",isAuth,services.homeRoutes)

route.get("/add-user", isAuth, services.add_user);

route.get("/update-user", isAuth, services.update_user);



route.get("/login", isLoggedOut, isAuthAdmin, services.login); // Login Page render

route.get("/", isLoggedIn, services.home); // Home Page render

route.get("/adminlogin", isAuthAdmin, services.adminlogin); // Adimin Login Page render

route.get("/register", isLoggedOut, isAuthAdmin, services.register); // Register User

route.post("/adminlogin", services.isAdmin); // postMethodeadminlogin

route.post("/admindash", services.logoutAdmin); // post for admin home

route.post("/", services.logoutUser); // post for home users

//API
route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

//Custom API for login

route.post("/api/login", controller.isUser);
route.get("*", services.notFound); // 404 error

module.exports = route;
