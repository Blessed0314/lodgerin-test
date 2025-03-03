const bcrypt = require("bcrypt");

const encryptPw = async( password ) => {
    return await bcrypt.hash( password, 10 );
}

const comparePw = async( passwordIn, passwordBd )  => {
    return await bcrypt.compare( passwordIn, passwordBd );
}

module.exports = { encryptPw, comparePw }