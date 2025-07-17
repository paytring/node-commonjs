const assert = require('assert');
const Paytring = require('../src/index');

describe('Paytring SDK', () => {
    let paytring;

    beforeEach(() => {
        paytring = new Paytring('test_api_key', 'test_api_secret');
    });

    describe('Constructor', () => {
        it('should create instance with API key and secret', () => {
            assert.strictEqual(paytring.key, 'test_api_key');
            assert.strictEqual(paytring.secret, 'test_api_secret');
        });

        it('should have order methods', () => {
            assert(typeof paytring.order === 'object');
            assert(typeof paytring.order.create === 'function');
            assert(typeof paytring.order.fetch === 'function');
            assert(typeof paytring.order.fetchAdvance === 'function');
        });

        it('should have UPI methods', () => {
            assert(typeof paytring.upi === 'object');
            assert(typeof paytring.upi.vpa === 'object');
            assert(typeof paytring.upi.vpa.validate === 'function');
        });

        it('should have hash methods', () => {
            assert(typeof paytring.hash === 'object');
            assert(typeof paytring.hash.verify === 'function');
        });
    });

    describe('Hash Verification', () => {
        it('should verify hash correctly', () => {
            const testData = {
                order_id: 'test_order_123',
                status: 'success',
                amount: 1000
            };

            const { createHash } = require('../src/utils/utils');
            const generatedHash = createHash(testData, 'test_secret');

            const isValid = paytring.hash.verify(testData, 'test_secret', generatedHash);
            assert.strictEqual(isValid, true);
        });

        it('should reject invalid hash', () => {
            const testData = {
                order_id: 'test_order_123',
                status: 'success',
                amount: 1000
            };

            const invalidHash = 'invalid_hash_value';
            const isValid = paytring.hash.verify(testData, 'test_secret', invalidHash);
            assert.strictEqual(isValid, false);
        });
    });

    describe('Utils', () => {
        const { createHash } = require('../src/utils/utils');

        it('should create consistent hash for same data', () => {
            const testData = { key1: 'value1', key2: 'value2' };
            const hash1 = createHash(testData, 'secret');
            const hash2 = createHash(testData, 'secret');

            assert.strictEqual(hash1, hash2);
        });

        it('should create different hash for different data', () => {
            const testData1 = { key1: 'value1', key2: 'value2' };
            const testData2 = { key1: 'value1', key2: 'different_value' };

            const hash1 = createHash(testData1, 'secret');
            const hash2 = createHash(testData2, 'secret');

            assert.notStrictEqual(hash1, hash2);
        });

        it('should sort keys before creating hash', () => {
            const testData1 = { b: 'value2', a: 'value1' };
            const testData2 = { a: 'value1', b: 'value2' };

            const hash1 = createHash(testData1, 'secret');
            const hash2 = createHash(testData2, 'secret');

            assert.strictEqual(hash1, hash2);
        });
    });
});
