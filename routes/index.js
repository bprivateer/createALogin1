const express = require('express');
const router = express.Router();

let dummy_user = {username: "bernadette", password: "password1"};

function auth(req, res, next){
  if(req.session.token){
    res.redirect('results')
  } else {
    next();
  }
};

router.get('/', auth, function(req, res){
  res.render("login");
});


router.get("/home", function(req, res, next) {
  if (req.session.token) {
    next();
  } else {
    res.redirect("/")
  }
}, function(req, res) {
  res.render("results", req.session.dummy_user);
});



router.post('/home', function(req, res){

  let user = {
    username: req.body.username,
    password: req.password.username,
  };

  if(user.username == dummy_user.username && user.password == dummy_username.password){
   req.session.user = obj;
   req.session.token = "token";

   res.redirect('/home');
  } else {
    res.redirect("/");
  }
});

router.get("/logout", function(req, res) {
  // req.session.destroy(); is good too
  req.session.destroy(function(err) {
    console.log(err);
  });

  res.redirect("/");
});
// router.post('home')

module.exports = router;
