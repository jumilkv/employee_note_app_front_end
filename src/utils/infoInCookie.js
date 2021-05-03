import Cookie from "js-cookie";
const jwt = require('jsonwebtoken');

export default function infoInCookie() {
    try {
        let token = Cookie.get('token');
        if (token)
            return jwt.decode(token);
        else
            throw token
    }
    catch {
        return ({
            message: 'Unable to read cookie.',
            variant: "error"
        });
    }
}
