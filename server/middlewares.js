import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {

    console.log('authenticateToken')
    //authorization נשלוף את הכותרת 
    const authHeader = req.headers['authorization'];
    // אם הכותרת לא מכילה את הטוקן
    if (!authHeader) {
        return res.status(401).send({ message: "No token provided" });
    }
    // Bearer הורדת ה  
    const token = authHeader.slice(7);
    // שליפת המחרוזת הסודית
    const secret = process.env.JWT_SECRET;
    try {
        // נפענח את הטוקן
        // ונאמת את החתימה 
        //catch אם זה לא יאומת הוא יעיף ל
        const decoded = jwt.verify(token, secret);
        // נשמור את המידע מהטוקן בבקשה לצורך ההמשך
        req.user = decoded;
        next();
        
    }
    catch {
        res.status(401).send({ message: "unAuthorized" })
    }
}

export const authorizeAdmin = (req, res, next) => {
 
    if (req.user.role != 'admin') {
        return res.status(403).send(
            {
                sucsses: false,
                message: "You don’t have permission to do this action try again"
            });
    }
    next();
}
export const authorizeSupplier = (req, res, next) => {
    
    if (req.user.role != 'supplier') {
        return res.status(403).send(
            {
                sucsses: false,
                message: "'You don’t have permission to do this action"
            });
    }
    next();
}

