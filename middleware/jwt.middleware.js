import jwt from "jsonwebtoken" ;

const isAuthenticated = (req, res, next) => {
  if (
    req.headers.authorization.split(" ")[0] === "Bearer" &&
    req.headers.authorization.split(" ")[1]
  ) {
    const token = req.headers.authorization.split(" ")[1]
    
    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET)
      // console.log(req.payload);
      req.payload = payload
      next()
    }
  catch (error) {
    return res.status(403).json({ message: "Invalid Token" })
  }
} else {
  res.status(403).json({message: "Headers Mlaformed"})
}
}
export default isAuthenticated;
