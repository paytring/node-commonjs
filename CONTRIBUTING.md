# Contributing to CommonJS SDK

Thank you for your interest in contributing to the CommonJS SDK for Paytring! We welcome contributions from the community and appreciate your help in making this SDK better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Release Process](#release-process)

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior to [support@paytring.com](mailto:support@paytring.com).

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your feature or bug fix
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js (>= 12.0.0)
- npm or yarn
- Git

### Setup Steps

1. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/commonjs-sdk.git
cd commonjs-sdk
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file for testing:
```bash
cp .env.example .env
# Add your test API credentials
```

4. Run the example to ensure everything works:
```bash
node examples/basic-usage.js
```

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Code samples (if applicable)
- Environment details (Node.js version, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- A clear and descriptive title
- Detailed description of the proposed feature
- Use cases and benefits
- Any relevant examples or mockups

### Contributing Code

#### Types of Contributions

- Bug fixes
- New features
- Performance improvements
- Documentation improvements
- Test coverage improvements

#### Branch Naming

Use descriptive branch names:
- `feature/add-refund-functionality`
- `bugfix/fix-hash-verification`
- `docs/update-readme`
- `test/add-order-tests`

## Pull Request Process

1. **Create a feature branch** from `main`:
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes** following our coding standards

3. **Test your changes** thoroughly

4. **Update documentation** if necessary

5. **Commit your changes** with clear, descriptive messages:
```bash
git commit -m "feat: add refund functionality"
git commit -m "fix: resolve hash verification issue"
git commit -m "docs: update API documentation"
```

6. **Push to your fork**:
```bash
git push origin feature/your-feature-name
```

7. **Create a Pull Request** with:
   - Clear title and description
   - Reference to related issues
   - Screenshots (if applicable)
   - Testing instructions

### Pull Request Requirements

- [ ] Code follows our style guidelines
- [ ] Self-review of the code has been performed
- [ ] Code has been tested
- [ ] Documentation has been updated
- [ ] No breaking changes (or clearly documented)

## Coding Standards

### JavaScript Style Guide

We follow these coding standards:

- Use 4 spaces for indentation
- Use semicolons
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use UPPER_SNAKE_CASE for constants
- Maximum line length of 100 characters

### Code Structure

```javascript
// Good
const createOrder = async (orderData) => {
    try {
        const response = await api.post('/order/create', orderData);
        return response.data;
    } catch (error) {
        throw new Error(`Order creation failed: ${error.message}`);
    }
};

// Bad
const createOrder=async(orderData)=>{
try{
const response=await api.post('/order/create',orderData)
return response.data
}catch(error){
throw new Error(`Order creation failed: ${error.message}`)
}
}
```

### Error Handling

- Always use try-catch blocks for async operations
- Provide meaningful error messages
- Don't swallow errors silently
- Use appropriate error types

### Comments

- Use JSDoc for function documentation
- Comment complex logic
- Keep comments up-to-date with code changes

```javascript
/**
 * Creates a new payment order
 * @param {Object} orderData - Order creation data
 * @param {string} orderData.cname - Customer name
 * @param {string} orderData.email - Customer email
 * @param {number} orderData.amount - Amount in paise
 * @returns {Promise<Object>} Created order object
 * @throws {Error} When order creation fails
 */
const createOrder = async (orderData) => {
    // Implementation
};
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "order creation"
```

### Writing Tests

- Write tests for all new functionality
- Include both positive and negative test cases
- Use descriptive test names
- Mock external dependencies

Example test structure:
```javascript
describe('Order Management', () => {
    describe('createOrder', () => {
        it('should create order with valid data', async () => {
            // Test implementation
        });

        it('should throw error with invalid data', async () => {
            // Test implementation
        });
    });
});
```

## Documentation

### API Documentation

- Document all public methods
- Include parameter types and descriptions
- Provide usage examples
- Document error conditions

### README Updates

When adding new features:
- Update the features list
- Add usage examples
- Update the table of contents if needed

### Code Examples

- Keep examples simple and focused
- Test all code examples
- Include error handling in examples

## Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality
- **PATCH** version for backwards-compatible bug fixes

### Release Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md`
- [ ] Update documentation
- [ ] Create release notes
- [ ] Tag the release
- [ ] Publish to npm

## Questions?

If you have questions about contributing, please:

1. Check existing issues and discussions
2. Ask in our [Discord community](https://discord.gg/paytring)
3. Email us at [support@paytring.com](mailto:support@paytring.com)

## Recognition

Contributors will be recognized in:
- CHANGELOG.md
- README.md contributors section
- Release notes

Thank you for contributing to CommonJS SDK! 🎉