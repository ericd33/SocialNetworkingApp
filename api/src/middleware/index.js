const admin = require("../firebase/config");
class Middleware {

    async decodeToken(req, res, next) {
        
        try{
            const token = req.headers.authorization.split(' ')[1];

        const decodeValue = await admin.auth().verifyIdToken(token)
        if(decodeValue) {
            return next();
        }
        return res.json({message:"Unauthorized."})
    }
    catch(e){
        return res.json({message: 'Error'});

    }
  }
}

module.exports = new Middleware();
