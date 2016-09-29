var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/',isLoggedIn,function(req, res, next) {

   if( req.user.role=="admin"){

       res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
       res.redirect('/admin');
   }else  if(req.user.role=="manager"){

       res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
       res.redirect('/manager');
   }
   else  if(req.user.role=="owner"){

       res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
       res.redirect('/owner');
   }
   else if(isLoggedIn){
       res.locals.user = req.user.first_name+ ' '+ req.user.last_name;
       res.redirect('/account');
   }
   else{
        res.redirect('login');
    }

});

router.get('/login',function(req,res){
    res.locals.message=null;
    res.render('login');
});



/**
 *
 * passport authentication post request
 *
 */
router.post('/login',function(req, res, next) {



      passport.authenticate('local-login',function(err, user, message) {

        if (err) {



          return res.redirect('/login');
        }
        if (!user) {



            res.locals.message="invalid email or password";

            return res.render('login');;
        }


        req.logIn(user, function(err) {
            if(!user.role){
               return res.redirect('/account')
            }

          else if(user.role=='admin'){

            return res.redirect('/admin');
          }else if(user.role=='manager')
          {
            return res.redirect('/manager');
          }else {
                return res.redirect('/owner');

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
    res.redirect('/login');
});
//verifiy if user is connected or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    //   return next();

    res.redirect('/login');

}
module.exports = router;
