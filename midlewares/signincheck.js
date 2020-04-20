const jwt = require('jsonwebtoken')

function signinCheck (req, res , next){
    
    const jwtKey = 'my_secret_key'
    const jwtExpirySeconds = 300
    const token = req.cookies.token

    if (!token) {
      console.log("booooooooooooooooooooooooooooooooooooooooooooooooooy");
      return res.status(401).end()
      
    }
  
    var payload
    try {
      payload = jwt.verify(token, jwtKey)
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        console.log("booooooooooooooooooooooooooooooooooooooooooooooooooy1");

        return res.status(401).end()
      }
      console.log("booooooooooooooooooooooooooooooooooooooooooooooooooy2");

      return res.status(400).end()
    }
    
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds < 30) {
      const newToken = jwt.sign({ username: payload.username}, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
      })
      res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
            console.log("booooooooooooooooooooooooooooooooooooooooooooooooooy");

    }
  

    next()
}

module.exports = signinCheck
