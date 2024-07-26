const { createHash } = require("../utils/utils.js");

module.exports = (api) => {
    return {
        validateVpa: async (vpa) => {
            const endpoint = 'upi/validate';
            const reqBody = {
                key: api.key,
                vpa
            };
            return api.post(endpoint, reqBody);
        }
    };
};
