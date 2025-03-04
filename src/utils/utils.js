const crypto = require('crypto');

const createHash = (body, secret) => {
    const keys = Object.keys(body).sort();
    let values = [];
    
    keys.forEach(key => {
        values.push(body[key]);
    });

    let sortedValues = values.join('|');
    sortedValues = sortedValues.concat(`|${secret}`);
    return crypto.createHash('sha512').update(sortedValues).digest('hex');
}

const verifyHash = (body, secret, hash) => {
    const generatedHash = createHash(body, secret);
    return generatedHash === hash;
}

module.exports = {
    createHash,
    verifyHash
};
