export const cookies = {
    set: (res, cookiename, value)=> {
        res.cookie(cookiename, value, {maxAge: 60000*60, httpOnly: true, sameSite: 'strict'});
    },
    get: (req, cookiename)=>{
        req.cookies[cookiename];
    },
    clear: (res, cookiename)=>{
        res.clearCookie(cookiename);
    }
}

