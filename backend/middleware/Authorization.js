import jwt from "jsonwebtoken";

export const requireLogin=(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;
        console.log(authHeader);
        if(!authHeader || !authHeader.startsWith("Bearer"))
        {
            return res.status(401).send({
                success:false,
                message:"Unauthorized access not allowed"
            })
        }
        const token=authHeader.split(" ")[1];
        console.log("Token ",token);
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        console.log("decoded  ",decodedToken);
        if(!decodedToken)
        {
            return res.status(401).send({
                success:false,
                message:"Invalid token not allowed"
            })
        }
        console.log(decodedToken);
        req.user=decodedToken;
        next();
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"internal server error"
        })
    }
}