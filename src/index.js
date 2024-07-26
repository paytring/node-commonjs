const order = require("./order/order.js");
const upi = require("./upi/upi.js");
const Api = require("./utils/request.js");
const { verifyHash } = require("./utils/utils.js");

class Paytring extends Api {

    constructor(apiKey, apiSecret) {
        super(apiKey, apiSecret);
    }

    order = {
        create: order(this).create,
        
        fetch: order(this).fetch,

        fetchAdvance: order(this).fetchAdvance,
    }

    upi = {
        vpa: {
            validate: upi(this).validateVpa
        }
    }

    hash = {
        verify: verifyHash
    }
}

module.exports = Paytring;
