const axios = require("axios");
const adminEmail = "admin@gmail.com";
const adminPassword = "1234";
const user = []; //temp data base

exports.homeRoutes = (req, res) => {
  // make a get req to /api/users
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {
  res.render("add_user");
};

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// Login Page
exports.login = (req, res) => {
  req.session.emailIsValid = false;
  res.render("login", { isValidate: req.session.isValidate })
  // , (err, html) => {
    // if(err){
    //   return res.send('Internal err');
    // }

    // delete req.session.isValidate;

    // res.send(html);
  // }); 
};

// Home Page
exports.home = (req, res) => {
  res.render("home", { userName: req.session.userName });
};

// Admin Login Page
exports.adminlogin = (req, res) => {
  res.render("adminlogin");
};

//Rgister User Page
exports.register = (req, res) => {
  req.session.isValidate = false;
  res.render("register", { emailIsValid: req.session.emailIsValid });
};

//404 error
exports.notFound = (req, res) => {
  res.render("error");
};

//Post for admin
exports.isAdmin = (req, res) => {
  const { email: inputEmail, password: inputPassword } = req.body;
  if (inputEmail === adminEmail && inputPassword === adminPassword) {
    req.session.isAuth = true;
    res.redirect("/admindash");
  } else {
    res.redirect("/adminlogin");
  }
};



// post for admin page home
exports.logoutAdmin = (req, res) => {
  req.session.destroy();
  res.redirect("/adminlogin");
};

//logout for home user
exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
