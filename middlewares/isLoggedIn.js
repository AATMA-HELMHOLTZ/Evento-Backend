
module.exports = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }
    res.redirect("/login");
};
