# Paytring Node.js SDK

[![npm version](https://badge.fury.io/js/commonjs-sdk.svg)](https://badge.fury.io/js/commonjs-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official Node.js ( Comman js ) SDK for [Paytring Payment Gateway](https://paytring.com). Accept payments, validate UPI addresses, and manage orders with ease.

## Installation

```bash
npm install commonjs-sdk
```

## Quick Start

```javascript
const Paytring = require('commonjs-sdk');

// Initialize with your API credentials
const paytring = new Paytring('your_api_key', 'your_api_secret');

// Create a payment order
const order = await paytring.order.create({
    cname: 'John Doe',
    email: 'john@example.com',
    phone: 9876543210,
    amount: 1000, // Amount in paise (₹10.00)
    receiptId: 'receipt_123',
    callbackUrl: 'https://your-site.com/callback'
});

console.log('Order created:', order);
```

## Authentication

Get your API credentials from [Paytring Dashboard](https://dashboard.paytring.com):

1. Sign up/Login to your Paytring account
2. Navigate to API Settings
3. Copy your API Key and API Secret

### Test vs Production

- **Test API Key**: Starts with `test_`
- **Production API Key**: Starts with `prod_`

```javascript
// Test environment
const paytring = new Paytring('test_abc123...', 'your_test_secret');

// Production environment
const paytring = new Paytring('prod_xyz789...', 'your_prod_secret');
```

## API Reference

### Orders

#### Create Order

Create a new payment order:

```javascript
const orderData = {
    cname: 'Customer Name',        // Required: Customer name
    email: 'customer@email.com',   // Required: Customer email
    phone: 9876543210,             // Required: Customer phone (10 digits)
    amount: 1000,                  // Required: Amount in paise (1000 = ₹10)
    receiptId: 'receipt_123',      // Required: Unique receipt ID
    callbackUrl: 'https://your-site.com/callback' // Required: Callback URL
};

try {
    const order = await paytring.order.create(orderData);
    console.log('Order ID:', order.id);
    console.log('Payment URL:', order.payment_url);
} catch (error) {
    console.error('Order creation failed:', error.message);
}
```

#### Fetch Order

Get order details by order ID:

```javascript
try {
    const order = await paytring.order.fetch('order_id_here');
    console.log('Order status:', order.status);
    console.log('Payment details:', order);
} catch (error) {
    console.error('Failed to fetch order:', error.message);
}
```

#### Fetch Advanced Order Details

Get detailed order information:

```javascript
try {
    const orderDetails = await paytring.order.fetchAdvance('order_id_here');
    console.log('Detailed order info:', orderDetails);
} catch (error) {
    console.error('Failed to fetch advanced details:', error.message);
}
```

### UPI

#### Validate VPA (Virtual Payment Address)

Verify if a UPI ID is valid:

```javascript
try {
    const result = await paytring.upi.vpa.validate('user@paytm');
    
    if (result.valid) {
        console.log('VPA is valid');
        console.log('Account holder:', result.name);
    } else {
        console.log('Invalid VPA');
    }
} catch (error) {
    console.error('VPA validation failed:', error.message);
}
```

### Hash Verification

Verify webhook payload integrity:

```javascript
const webhookData = {
    order_id: 'order_123',
    status: 'success',
    amount: 1000
    // ... other webhook data
};

const receivedHash = 'hash_from_webhook_header';
const isValid = paytring.hash.verify(webhookData, 'your_api_secret', receivedHash);

if (isValid) {
    console.log('Webhook data is authentic');
    // Process the webhook
} else {
    console.log('Invalid webhook data');
    // Reject the webhook
}
```

## Error Handling

The SDK throws errors for failed API calls. Always use try-catch blocks:

```javascript
try {
    const order = await paytring.order.create(orderData);
    // Success handling
} catch (error) {
    console.error('Error:', error.message);
    
    // Handle specific errors
    if (error.message.includes('Invalid API key')) {
        // Handle authentication error
    } else if (error.message.includes('Insufficient balance')) {
        // Handle balance error
    }
}
```

## Webhook Handling

Handle payment status updates from Paytring:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
    const webhookData = req.body;
    const receivedHash = req.headers['x-paytring-signature'];
    
    // Verify webhook authenticity
    const isValid = paytring.hash.verify(
        webhookData, 
        'your_api_secret', 
        receivedHash
    );
    
    if (!isValid) {
        return res.status(400).send('Invalid signature');
    }
    
    // Process the webhook
    console.log('Payment status:', webhookData.status);
    console.log('Order ID:', webhookData.order_id);
    
    // Update your database
    // Send confirmation email
    // etc.
    
    res.status(200).send('OK');
});
```

## Environment Variables

For security, store your credentials in environment variables:

```javascript
require('dotenv').config();

const paytring = new Paytring(
    process.env.PAYTRING_API_KEY,
    process.env.PAYTRING_API_SECRET
);
```

Create a `.env` file:

```env
PAYTRING_API_KEY=your_api_key_here
PAYTRING_API_SECRET=your_api_secret_here
```

## TypeScript Support

The SDK includes TypeScript definitions. For better type safety:

```typescript
import Paytring from 'commonjs-sdk';

interface OrderData {
    cname: string;
    email: string;
    phone: number;
    amount: number;
    receiptId: string;
    callbackUrl: string;
}

const paytring = new Paytring('your_api_key', 'your_api_secret');

const createOrder = async (orderData: OrderData) => {
    try {
        const order = await paytring.order.create(orderData);
        return order;
    } catch (error) {
        console.error('Order creation failed:', error);
        throw error;
    }
};
```

## Security Best Practices

1. **Never expose credentials**: Store API keys in environment variables
2. **Verify webhooks**: Always verify webhook signatures
3. **Use HTTPS**: Ensure your callback URLs use HTTPS
4. **Validate amounts**: Double-check payment amounts before processing
5. **Log transactions**: Maintain proper logs for debugging and compliance

## Testing

Test your integration using test API keys:

```javascript
// Use test credentials
const paytring = new Paytring('test_your_key', 'test_your_secret');

// Test order creation
const testOrder = await paytring.order.create({
    cname: 'Test Customer',
    email: 'test@example.com',
    phone: 9999999999,
    amount: 100, // ₹1.00
    receiptId: 'test_receipt_' + Date.now(),
    callbackUrl: 'https://httpbin.org/post'
});
```

## Support

- 📧 Email: [support@paytring.com](mailto:support@paytring.com)
- 📖 Documentation: [https://docs.paytring.com](https://docs.paytring.com)
- 🐛 Issues: [GitHub Issues](https://github.com/paytring/commonjs-sdk/issues)
- 💬 Community: [Discord Server](https://discord.gg/paytring)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related

- [Paytring PHP SDK](https://github.com/paytring/paytring-php)
- [Paytring Python SDK](https://github.com/paytring/paytring-python)
- [Paytring Go SDK](https://github.com/paytring/paytring-go)
- [Paytring CommonJS SDK](https://github.com/paytring/commonjs-sdk)

---

Made with ❤️ by [Paytring](https://paytring.com)
