import jwt from "jsonwebtoken" ;

const isAuthenticated = (req, res, next) => {
 try {
    if (
      req.headers.authorization.split(" ")[0] === "Bearer" &&
      req.headers.authorization.split(" ")[1]
    ) {
      const token = req.headers.authorization.split(" ")[1]
      const payload = jwt.verify(token, process.env.TOKEN_SECRET)

      req.payload = payload
      next()
    }
  } catch (error) {
    console.log("Auth Error:", error.message)
    return res.status(401).json({ message: "Invalid Token" })
  }
}

export default isAuthenticated;
