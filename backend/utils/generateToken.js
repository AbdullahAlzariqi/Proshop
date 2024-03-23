import jwt from "jsonwebtoken";



const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    //SET jwt as HTTP-ONLY COOKIE

    res.cookie('jwt', token, {  //the first parameter detemines the name we are goind to call at req.cookie.{{name}}
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
    })
}

export default generateToken