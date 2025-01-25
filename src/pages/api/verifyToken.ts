import * as jwt from 'jsonwebtoken' 
export default function verifyToken(token: string | undefined) {
    try {
        console.log("token")
        console.log(token)
        if(token) {
            jwt.verify(token!!,'zayinha')
        } else {
            throw new Error()
        }
        return true
      } catch(e) {
            console.log("NAAAAAAAA")
          return false
      }
}