const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
exports.protect = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.redirect("/login");
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.redirect("/login");
    }
}