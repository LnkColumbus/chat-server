const jwt = require('jsonwebtoken');

const verifyJWT = ( token = '' ) => {

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        return [ true, uid ];
    } catch (error) {
        return [ false, error ];
    }
}

module.exports = {
    verifyJWT
}