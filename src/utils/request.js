const axios = require("axios");
const { createHash } = require("./utils.js");
const staticValues = require('../static/static.js');
const crypto = require('crypto');

class Api {

    constructor(apiKey, apiSecret) {
        this.key = apiKey;
        this.secret = apiSecret;
    }

    requestWrapper = axios.create({
        baseURL: `${staticValues.API_BASE_URL}/api/${staticValues.API_VERSION}`,
        headers: staticValues.HEADERS
    })

    get = async(endpoint) => {
        const response = await this.requestWrapper.get(endpoint);
        return response;
    }

    post = async(endpoint, body) => {
        const requestBody = {
            ...body,
            hash: createHash(body, this.secret)
        }
        const response = await this.requestWrapper.post(endpoint, requestBody);
        if (!response.data.status) {
            throw new Error(response.data.error.message);
        }
        return response.data;
    }
}

module.exports = Api;
