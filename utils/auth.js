//helper to check if session cookie is true to allow user to use functionality on the website
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

//helper to check session cookie is good but will return a json alert not logged in if returned incorrectly
const withApiAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(401).json({message: "You are not logged in"});
  } else {
    next();
  }
};

module.exports ={withAuth, withApiAuth};
