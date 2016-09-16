var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/',function(req, res, next) {
   if(req.isAuthenticated()){

       res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
       res.redirect('/home');
   }else{
       res.locals.user= null;
        res.render('login');
    }

});
//get the home page function
router.get('/home',isLoggedIn, function (req, res) {

    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('index');
});
//get the add  page function
router.get('/add',isLoggedIn, function (req, res) {

    res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
    res.render('addClient');
});
/**
 *
 * passport authentication post request
 *
 */
router.post('/login',function(req, res, next) {



      passport.authenticate('local-login',function(err, user, message) {

        if (err) {



          return res.redirect('/');
        }
        if (!user) {




            return res.redirect('/');;
        }


        req.logIn(user, function(err) {

          if(user.role=='admin'){

            return res.redirect('/home');
          }else
          {
            return res.redirect('/home');
          }

        });

      })(req, res, next);
    },
    function(err, req, res, next) {
      // failure in login test route

      return res.redirect("/login");
    }
);


//logout function
router.get('/logout', function (req, res) {

    req.logout();
    res.redirect('/');
});
//verifiy if user is connected or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    //   return next();

    res.redirect('/error');

}
module.exports = router;
