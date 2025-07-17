/**
 * @typedef {string} ApiKeyType - API key starting with 'test_' or 'prod_'
 */

/**
 * @typedef {Object} Order
 * @property {string} cname - Customer name
 * @property {string} email - Customer email
 * @property {number} phone - Customer phone number
 * @property {number} amount - Amount in paise
 * @property {string} receiptId - Unique receipt identifier
 * @property {ApiKeyType} key - API key
 * @property {string} callbackUrl - Callback URL for payment updates
 * @property {Object} [notes] - Additional notes/metadata
 */

/**
 * @typedef {Object} OrderResponse
 * @property {string} id - Order ID
 * @property {string} status - Order status
 * @property {string} payment_url - Payment URL
 * @property {number} amount - Order amount
 * @property {string} receiptId - Receipt ID
 */

/**
 * @typedef {Object} VpaValidationResponse
 * @property {boolean} valid - Whether VPA is valid
 * @property {string} [name] - Account holder name if valid
 */

module.exports = {
  // Types are exported as JSDoc comments for CommonJS compatibility
};
