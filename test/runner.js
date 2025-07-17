// Simple test runner for basic testing
const fs = require('fs');
const path = require('path');

// Global test state
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let currentSuite = '';

// Test framework functions
global.describe = (suiteName, callback) => {
    console.log(`\n📁 ${suiteName}`);
    currentSuite = suiteName;
    callback();
};

global.it = (testName, callback) => {
    totalTests++;
    try {
        callback();
        passedTests++;
        console.log(`  ✅ ${testName}`);
    } catch (error) {
        failedTests++;
        console.log(`  ❌ ${testName}`);
        console.log(`     Error: ${error.message}`);
        if (error.stack) {
            console.log(`     ${error.stack.split('\n')[1].trim()}`);
        }
    }
};

global.beforeEach = (callback) => {
    // Simple beforeEach implementation
    // In a real test runner, this would be called before each test
    global._beforeEachCallback = callback;
};

// Override it to call beforeEach
const originalIt = global.it;
global.it = (testName, callback) => {
    if (global._beforeEachCallback) {
        global._beforeEachCallback();
    }
    originalIt(testName, callback);
};

// Simple assertion library
global.assert = {
    strictEqual: (actual, expected, message) => {
        if (actual !== expected) {
            throw new Error(message || `Expected ${expected}, but got ${actual}`);
        }
    },
    notStrictEqual: (actual, expected, message) => {
        if (actual === expected) {
            throw new Error(message || `Expected ${actual} to not equal ${expected}`);
        }
    },
    ok: (value, message) => {
        if (!value) {
            throw new Error(message || `Expected truthy value, but got ${value}`);
        }
    }
};

// Helper function for typeof checks
global.assert.assert = (condition, message) => {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
};

// Run tests
const runTests = () => {
    console.log('🚀 Running CommonJS SDK Tests\n');

    // Load and run test files
    const testDir = __dirname;
    const testFiles = fs.readdirSync(testDir)
        .filter(file => file.endsWith('.test.js'))
        .map(file => path.join(testDir, file));

    testFiles.forEach(testFile => {
        require(testFile);
    });

    // Print results
    console.log('\n📊 Test Results:');
    console.log(`Total: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);

    if (failedTests > 0) {
        console.log('\n❌ Some tests failed');
        process.exit(1);
    } else {
        console.log('\n✅ All tests passed!');
        process.exit(0);
    }
};

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

module.exports = {
    runTests
};
