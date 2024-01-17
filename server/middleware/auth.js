import jwt from 'jsonwebtoken';
export const verifyToken = async (req, res, next) =>{
    try {
        let token = req.header("Authorization")
        if(!token){
            return res.status(403).send("Access Denied");
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft(); //trimLeft is used to remove any whitespace on right side of string 
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET );
        req.user = verified; //adds user infromation decoded from web token to the object
        next(); //goes to the next function

    } catch (err){
        res.status(500).json({error: err.message})
    }
}