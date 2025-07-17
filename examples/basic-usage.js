const Paytring = require('../src/index');
require('dotenv').config();

// Initialize Paytring with your credentials
const paytring = new Paytring(
    process.env.PAYTRING_API_KEY || 'test_your_api_key_here',
    process.env.PAYTRING_API_SECRET || 'your_api_secret_here'
);

async function basicExample() {
    try {
        console.log('🚀 Paytring Node.js SDK Example\n');

        // 1. Create a payment order
        console.log('1. Creating a payment order...');
        const orderData = {
            cname: 'John Doe',
            email: 'john.doe@example.com',
            phone: 9876543210,
            amount: 1000, // ₹10.00 (amount in paise)
            receiptId: 'receipt_' + Date.now(),
            callbackUrl: 'https://your-website.com/payment/callback'
        };

        const order = await paytring.order.create(orderData);
        console.log('✅ Order created successfully!');
        console.log('Order ID:', order.id);
        console.log('Payment URL:', order.payment_url);
        console.log('Status:', order.status);
        console.log('');

        // 2. Fetch order details
        console.log('2. Fetching order details...');
        const fetchedOrder = await paytring.order.fetch(order.id);
        console.log('✅ Order fetched successfully!');
        console.log('Order Status:', fetchedOrder.status);
        console.log('Amount:', fetchedOrder.amount);
        console.log('');

        // 3. Fetch advanced order details
        console.log('3. Fetching advanced order details...');
        const advancedOrder = await paytring.order.fetchAdvance(order.id);
        console.log('✅ Advanced order details fetched!');
        console.log('Detailed info available');
        console.log('');

        // 4. Validate UPI VPA
        console.log('4. Validating UPI VPA...');
        try {
            const vpaResult = await paytring.upi.vpa.validate('test@paytm');
            console.log('✅ VPA validation completed!');
            console.log('Is Valid:', vpaResult.valid);
            if (vpaResult.valid && vpaResult.name) {
                console.log('Account Holder:', vpaResult.name);
            }
        } catch (vpaError) {
            console.log('❌ VPA validation failed:', vpaError.message);
        }
        console.log('');

        // 5. Hash verification example
        console.log('5. Hash verification example...');
        const testData = {
            order_id: order.id,
            status: 'success',
            amount: 1000
        };

        // Create hash
        const { createHash } = require('../src/utils/utils');
        const generatedHash = createHash(testData, process.env.PAYTRING_API_SECRET || 'your_api_secret_here');

        // Verify hash
        const isValidHash = paytring.hash.verify(testData, process.env.PAYTRING_API_SECRET || 'your_api_secret_here', generatedHash);
        console.log('✅ Hash verification:', isValidHash ? 'Valid' : 'Invalid');
        console.log('');

        console.log('🎉 All examples completed successfully!');

    } catch (error) {
        console.error('❌ Error:', error.message);

        // Handle specific error cases
        if (error.message.includes('Invalid API key')) {
            console.log('💡 Make sure to set your PAYTRING_API_KEY and PAYTRING_API_SECRET environment variables');
        } else if (error.message.includes('Network Error')) {
            console.log('💡 Check your internet connection');
        }
    }
}

// Webhook verification example
function webhookExample() {
    console.log('\n📡 Webhook Verification Example:');
    console.log('// In your webhook endpoint handler:');
    console.log(`
app.post('/webhook', (req, res) => {
    const webhookData = req.body;
    const receivedHash = req.headers['x-paytring-signature'];

    // Verify webhook authenticity
    const isValid = paytring.hash.verify(
        webhookData,
        process.env.PAYTRING_API_SECRET,
        receivedHash
    );

    if (!isValid) {
        return res.status(400).send('Invalid signature');
    }

    // Process the webhook
    console.log('Payment status:', webhookData.status);
    console.log('Order ID:', webhookData.order_id);

    res.status(200).send('OK');
});
    `);
}

// Run the example
if (require.main === module) {
    basicExample().then(() => {
        webhookExample();
    });
}

module.exports = {
    basicExample,
    webhookExample
};
