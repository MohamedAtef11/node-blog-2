const bcrypt = require ('bcrypt')

function logReqBody (req , res , next){
    console.log("req body : ",req.body);
    if(req.body.pass){
        req.body.pass = bcrypt.hashSync(req.body.pass, 10);
    }
    next()
}

module.exports = logReqBody