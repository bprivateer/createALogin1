const express = require('express');
const router = express.Router();

let dummy_user = {username: "bernadette", password: "password1"};

function auth(req, res, next){
  if(req.session.token){
    res.redirect('/')
  } else {
    next();
  }
};

router.get('/', auth, function(req, res){
  res.render("login", {errors: req.session.errors});
});

router.get("/login", function(req, res, next) {
  if (req.session.token) {
    next();
  } else {
    res.redirect("/")
  }
}, function(req, res) {
  res.render("results", req.session.dummy_user);
});



router.post('/login',  function(req, res){
  console.log("post");

req.checkBody("username", "Name must have no special charcters").isAlpha();
req.checkBody("username", "name must not be empty").notEmpty();
req.checkBody("password", "must not be empty").notEmpty();
req.checkBody("password", "Password must be 8 letters long").isLength({min:8});

let messages = [];

let errors = req.getValidationResult().then(function(error) {
  // console.log(error.array());
  error.array().forEach(function(error){
    messages.push(error.msg)
    // console.log(error.msg);
    console.log('messages\n', messages);
  })
  if (messages.length > 0){
    req.session.errors = messages;
    res.redirect('/');
  }

  let user = {

    username: req.body.username,
    password: req.body.password,
  };

  if (user.username === dummy_user.username && user.password === dummy_user.password){
   req.session.dummy_user = user;
   req.session.token = "token";
   console.log(user.username);

   res.redirect('/login');
  } else {
    req.session.errors = ["Incorrect Login"];
    res.redirect("/");
  }
  // console.log(error.array(param));
});
// let errors = req.getValidationResult();


//
// let errObj = {
//   error: errors,
//   errors: messages,
//   info: req.body,
// }

// console.log('errObj: ', errObj);


})

router.get("/logout", function(req, res) {
  // req.session.destroy(); is good too
  req.session.destroy(function(err) {
    // console.log(err);
  });

  res.redirect("/");
});

module.exports = router;
