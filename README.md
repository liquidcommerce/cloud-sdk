<p align="start">
  <img 
    src="https://storage.googleapis.com/liquid-platform/repo_lc_dark.webp" 
    alt="LiquidCommerce Logo" 
    style="max-width: 70%; height: auto;" 
  />
</p>

# LiquidCommerce Cloud SDK

The LiquidCommerce Cloud SDK provides an easy way to interact with our APIs through a server-side SDK for Node.js and Web JS script.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Services](#services)
  - [Address](#address)
  - [Catalog](#catalog)
  - [Cart](#cart)
  - [User](#user)
  - [Payment](#payment)
  - [Checkout](#checkout)
- [Response Types](#response-types)
- [Error Handling](#error-handling)
- [Documentation](#documentation)

## Installation

Install the package with:

```sh
npm install @liquidcommerce/cloud-sdk
# or
yarn add @liquidcommerce/cloud-sdk
# or
pnpm add @liquidcommerce/cloud-sdk
```

## Configuration

The SDK requires configuration during initialization:

```typescript
import { LiquidCommerce, LIQUID_COMMERCE_ENV } from '@liquidcommerce/cloud-sdk';

const client = await LiquidCommerce('YOUR_LIQUIDCOMMERCE_API_KEY', {
  googlePlacesApiKey: 'YOUR_GOOGLE_PLACES_API_KEY', // Required for address services
  env: LIQUID_COMMERCE_ENV.STAGE // STAGE or PROD
});

await client.init();
```

## Response Types

All API responses follow a consistent structure:

```typescript
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  metadata: {
    languages: string[];
    timestamp: number;
    timezone: string;
    requestId: string;
    path: string;
    version: string;
  };
  data?: T; // Present in responses with data
}
```

## Services

### Address

Services for address validation and lookup:

```typescript
// Address autocompletion
const autocompleteResponse = await client.address.autocomplete({
  input: '100 Madison Ave, New York'
});

// Response type: IApiResponseWithData<IAddressAutocompleteResult[]>
// {
//   id: string;
//   description: string;
// }

// Get detailed address information
const detailsResponse = await client.address.details({
  id: 'ChIJd8BlQ2BZwokRjMKtTjMezRw'
});

// Response type: IApiResponseWithData<IAddressDetailsResult>
// {
//   formattedAddress: string;
//   coords: {
//     lat: number;
//     long: number;
//   }
// }
```

### Catalog

Product catalog search and availability services:

```typescript
// Check product availability
const availabilityResponse = await client.catalog.availability({
  upcs: ['123456789012', '210987654321'], // UPC codes
  grouping: ['group1', 'group2'], // Optional group identifiers
  ids: ['id1', 'id2'], // Optional product IDs
  loc: {
    address: {
      one: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001'
    }
  },
  shouldShowOffHours: true
});

// Search catalog with filters
const searchResponse = await client.catalog.search({
  search: 'whiskey',
  page: 1,
  perPage: 20,
  orderBy: ENUM_ORDER_BY.PRICE,
  orderDirection: ENUM_NAVIGATION_ORDER_DIRECTION_TYPE.ASC,
  filters: [
    { 
      key: ENUM_FILTER_KEYS.CATEGORIES, 
      values: [ENUM_SPIRITS.WHISKEY] 
    },
    { 
      key: ENUM_FILTER_KEYS.PRICE, 
      values: { min: 2000, max: 10000 } // Prices in cents
    },
    {
      key: ENUM_FILTER_KEYS.AVAILABILITY,
      values: ENUM_AVAILABILITY_VALUE.IN_STOCK
    }
  ],
  loc: {
    address: {
      one: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001'
    }
  }
});
```

### Cart

Shopping cart management:

```typescript
// Create new cart
const newCart = await client.cart.get();

// Retrieve existing cart
const existingCart = await client.cart.get('cart_id', true); // Second parameter for refresh

// Update cart
const updatedCart = await client.cart.update({
  id: 'cart_id',
  items: [
    {
      partNumber: '123456789012_retailer_id', // Required: {UPC}_{retailerId}
      quantity: 2,
      fulfillmentId: 'fulfillment_id',
      engravingLines: ['Line 1', 'Line 2'], // Optional
      scheduledFor: '2024-12-25', // Optional
    }
  ],
  loc: {
    address: {
      one: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001'
    }
  },
  promoCode: 'DISCOUNT10', // Optional
});
```

### User

User profile and preferences management:

```typescript
// Create/update user session
const userSession = await client.user.session({
  email: "user@example.com",
  firstName: "John",
  lastName: "Smith",
  phone: "2125551234",
  company: "Company Inc",
  profileImage: "https://...",
  birthDate: "1990-01-01"
});

// Fetch user by ID or email
const userData = await client.user.fetch('user_id_or_email');

// Address management
const newAddress = await client.user.addAddress({
  customerId: 'customer_id',
  placesId: 'google_places_id', // Optional if providing address details
  one: '100 Madison St',
  two: 'Apt 4B',
  city: 'New York',
  state: 'NY',
  zip: '10004',
  country: 'US',
  lat: 40.7128, // Optional
  long: -74.0060, // Optional
  type: ENUM_ADDRESS_TYPE.SHIPPING,
  isDefault: true
});

const updatedAddress = await client.user.updateAddress({
  // Same parameters as addAddress
});

// Payment methods
const newPayment = await client.user.addPayment({
  customerId: 'customer_id',
  paymentMethodId: 'payment_method_id',
  isDefault: true
});

const updatedPayment = await client.user.updatePayment({
  customerId: 'customer_id',
  paymentMethodId: 'payment_method_id',
  isDefault: true // Required for updates
});

// Data removal
await client.user.purge('user_id_or_email');
await client.user.purgeAddress('address_id');
await client.user.purgePayment('customer_id', 'payment_id');
```

### Payment

The payment system uses secure elements for handling sensitive payment data. Before using payment features, you must first create a user session.

#### Prerequisites

1. User Session Creation:
```typescript
// First create or get a user session
const userSession = await client.user.session({
  email: "user@example.com",
  // ... other user details
});

// The session response includes necessary payment credentials
const { setupIntent, publicKey } = userSession.data.session;
```

#### Payment Element Integration

```typescript
// Initialize payment form using session credentials
await client.payment.mount({
  clientSecret: userSession.data.session.setupIntent,  // Required: from session
  key: userSession.data.session.publicKey,            // Required: from session
  elementId: 'payment-element-container',             // Your DOM element ID
  appearance: { 
    theme: 'night'  // 'default' | 'night' | 'flat'
  },
  elementOptions: { 
    layout: 'tabs'  // 'tabs' | 'accordion' | 'auto'
  }
});

// Monitor payment element state
client.payment.subscribe('ready', () => {
  // Element is ready to accept input
});

client.payment.subscribe('change', (event) => {
  const { complete, empty, value } = event;
  // Handle validation state changes
});

// Process payment when ready
const tokenResult = await client.payment.generateToken();

// Handle the result
if ('error' in tokenResult) {
  const { type, message, code } = tokenResult.error;
  // type can be: 'validation_error' | 'api_error' | 'client_error' | 'confirm_error'
} else {
  // Use tokenResult.id for checkout completion or saving payment method
  const { id, card } = tokenResult;
}

// Always clean up when done
client.payment.unmount();
client.payment.destroy();
```

#### Security Considerations

1. **PCI Compliance**: The payment element handles card data securely within an iframe, ensuring your application never directly touches sensitive payment information.

2. **Token-Based**: All payment data is tokenized - you only receive secure tokens that can't be used to retrieve the original card details.

3. **Single Use**: Payment tokens are single-use and expire after a short time period.

4. **Domain Validation**: Payment elements will only work on domains that have been pre-registered with your account.

#### Best Practices

1. **Error Handling**: Always implement proper error handling:
```typescript
try {
  const token = await client.payment.generateToken();
  if ('error' in token) {
    switch(token.error.type) {
      case 'validation_error':
        // Handle invalid card data
        break;
      case 'api_error':
        // Handle API/network issues
        break;
      case 'client_error':
        // Handle setup/configuration issues
        break;
      case 'confirm_error':
        // Handle payment confirmation failures
        break;
    }
  }
} catch (error) {
  // Handle unexpected errors
}
```

2. **Cleanup**: Always clean up payment elements when done:
- When navigation away from payment page
- After successful payment
- After failed payment attempt
- Before unmounting payment component

3. **Event Handling**: Monitor element state for better user experience:
```typescript
client.payment.subscribe('change', (event) => {
  // Update UI based on validation state
  const { complete, empty } = event;
  submitButton.disabled = !complete || empty;
});

client.payment.subscribe('loaderror', (event) => {
  // Handle element loading failures
  console.error('Payment element failed:', event.error);
});
```

#### Responsive Design

The payment element automatically adapts to:
- Mobile and desktop viewports
- Right-to-left languages
- Dark/light themes
- Different container sizes

#### Testing Cards

When testing payments in staging environment, use these test cards:

```
// Test Visa Card
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits

// Test Mastercard
Card Number: 5555 5555 5555 4444
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits

// Example test card usage:
/*
  Card: 4242 4242 4242 4242
  Expiry: 12/29
  CVC: 123
  ZIP: 10001
*/
```

These cards will be accepted in test mode and will simulate successful payments. They should only be used in the staging environment, never in production.

**Important Notes:**
- These cards work only in test/staging environment
- Real cards will be declined in test mode
- Test cards will be declined in production
- All test transactions use simulated funds
- Use test credentials in staging environment
- Never use production credentials in development
- Test all error scenarios
- Verify proper cleanup implementation
- Test on multiple devices and browsers

### Checkout

Checkout process management:

```typescript
// Prepare checkout
const preparedCheckout = await client.checkout.prepare({
  cartId: "cart_id",
  customer: {
    id: "customer_id", // Optional
    email: "customer@example.com",
    firstName: "John",
    lastName: "Smith",
    phone: "2125551234",
    birthDate: "1990-01-01"
  },
  hasAgeVerify: true,
  billingAddress: {
    firstName: "John",
    lastName: "Smith",
    email: "billing@example.com",
    phone: "2125551234",
    one: "123 Main St",
    two: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "US"
  },
  hasSubstitutionPolicy: true,
  isGift: true,
  billingSameAsShipping: false,
  giftOptions: {
    message: "Happy Birthday!",
    recipient: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "2125555678"
    }
  },
  marketingPreferences: {
    canEmail: true,
    canSms: true
  },
  deliveryTips: [
    {
      fulfillmentId: "fulfillment_id",
      tip: 500 // Amount in cents
    }
  ],
  acceptedAccountCreation: true,
  scheduledDelivery: "2024-12-25T14:00:00Z",
  promoCode: 'DISCOUNT10', // Optional
  giftCards: ['GC123456'] // Optional
});

// Complete checkout
const completedCheckout = await client.checkout.complete({
  token: preparedCheckout.token,
  payment: "payment_token"
});
```

#### Checkout Payment

For direct checkout payments, the flow is similar but uses the checkout session:

```typescript
// 1. First prepare the checkout
const preparedCheckout = await client.checkout.prepare({
  cartId: "cart_id",
  // ... other checkout details
});

// 2. Initialize payment form with checkout data
await client.payment.mount({
  clientSecret: preparedCheckout.payment.clientSecret, // From checkout prepare response
  key: preparedCheckout.payment.publicKey,            // From checkout prepare response
  elementId: 'payment-element-container',
  appearance: { theme: 'night' },
  elementOptions: { layout: 'tabs' }
});

// 3. Handle payment element events
client.payment.subscribe('change', (event) => {
  // Monitor payment form state
  const { complete, empty, value } = event;
});

// 4. When ready to complete checkout, generate payment token
const tokenResult = await client.payment.generateToken();
if (!('error' in tokenResult)) {
  // 5. Complete checkout with payment token
  const completedCheckout = await client.checkout.complete({
    token: preparedCheckout.token,
    payment: tokenResult.id
  });
}

// 6. Clean up
client.payment.unmount();
client.payment.destroy();
```

## Error Handling

The SDK throws errors for various scenarios. Always wrap SDK calls in try-catch blocks:

```typescript
try {
  const result = await client.someMethod();
} catch (error) {
  console.error('Operation failed:', error.message);
  // Handle specific error cases
}
```

Common error scenarios:
- Authentication failures
- Invalid parameters
- Network errors
- Resource not found
- Rate limiting
- Validation errors

## Price Handling

All monetary values in the SDK are handled in cents (the smallest currency unit). For example:
- $10.00 is represented as 1000
- $5.99 is represented as 599
- $0.50 is represented as 50

## Documentation

For more detailed information about each method and its parameters, please refer to our [official documentation](https://docs.liquidcommerce.cloud).