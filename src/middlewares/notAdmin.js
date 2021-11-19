function notAdmin(req, res, next) {
	if (req.session.user) {
        let user = req.session.user;
        if(!user && user.admin != 0){
            return res.redirect('/');
        } 
	next();
}
}

module.exports = notAdmin;