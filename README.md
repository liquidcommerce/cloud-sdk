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
  - [API Key Authentication](#api-key-authentication)
  - [Order API Authentication](#order-api-authentication)
- [Services & Usage](#services-and-usage)
  - [Address](#address)
  - [Catalog](#catalog)
  - [Cart](#cart)
  - [User](#user)
  - [Payment Element](#payment-element)
  - [Legacy Payment](#legacy-payment)
  - [Checkout](#checkout)
  - [Orders](#orders)
  - [Webhook](#webhook)
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

### API Key Authentication

The LiquidCommerce API Key Authentication provides a secure method to obtain an access token for all other API calls to LiquidCommerce Services.

Example using LiquidCommerce client:

```typescript
// The SDK automatically handles authentication
const client = await LiquidCommerce('YOUR_LIQUIDCOMMERCE_API_KEY', {
  googlePlacesApiKey: 'YOUR_GOOGLE_PLACES_API_KEY', // Required for address services
  env: LIQUID_COMMERCE_ENV.STAGE, // or PROD
});
```

[Click Here For Manual Authentication](https://docs.liquidcommerce.cloud/authentication-api-integration/get-access-token)

### Order API Authentication

LiquidCommerce provides a separate authentication mechanism for Order API endpoints. The Order client uses Basic Authentication with a username and password.

Example using LiquidCommerceOrders client:

```typescript
const orderClient = await LiquidCommerceOrders({
  userID: 'YOUR_ORDER_API_USER_ID',
  password: 'YOUR_ORDER_API_PASSWORD',
  env: LIQUID_COMMERCE_ENV.STAGE, // or PROD
});
```

[Click Here For Manual Authentication](https://docs.liquidcommerce.cloud/services/orders-api/authentication)

Note: Order authentication credentials are required to access Order API. The SDK will return appropriate authentication errors if these credentials are missing or invalid.

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

## Services and Usage

### Auth

While the SDK handles authentication automatically, you can also manually retrieve the authentication details:

```typescript
// Manually retrieve authentication details
try {
  const authDetails = await client.auth();
  console.log('Access Token:', authDetails.token);
  console.log('Expires In:', authDetails.exp);
} catch (error) {
  console.error('Failed to get auth details:', error);
}
```

### Address

Services for address validation and lookup:

```typescript
// Address autocompletion
const autocompleteResponse = await client.address.autocomplete({
  input: '100 Madison Ave, New York',
});

// Response type: IApiResponseWithData<IAddressAutocompleteResult[]>
// {
//   id: string;
//   description: string;
// }

// Get detailed address information
const detailsResponse = await client.address.details({
  id: 'ChIJd8BlQ2BZwokRjMKtTjMezRw',
});

// Response type: IApiResponseWithData<IAddressDetailsResult>
// {
//   formattedAddress: string;
//   coords: {
//     lat: number;
//     long: number;
//   }
//   address: {
//     one: string,
//     two: string,
//     city": string,
//     state: string,
//     zip: string,
//     country: "US"
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
      zip: '10001',
    },
  },
  shouldShowOffHours: true,
});

// Search catalog with filters
const searchResponse = await client.catalog.search({
  search: 'whiskey',
  pageToken: '',
  entity: '',
  page: 1,
  perPage: 20,
  orderBy: ENUM_ORDER_BY.PRICE,
  orderDirection: ENUM_NAVIGATION_ORDER_DIRECTION_TYPE.ASC,
  filters: [
    {
      key: ENUM_FILTER_KEYS.CATEGORIES,
      values: [ENUM_SPIRITS.WHISKEY],
    },
    {
      key: ENUM_FILTER_KEYS.PRICE,
      values: { min: 2000, max: 10000 }, // Prices in cents
    },
    {
      key: ENUM_FILTER_KEYS.AVAILABILITY,
      values: ENUM_AVAILABILITY_VALUE.IN_STOCK,
    },
  ],
  loc: {
    address: {
      one: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  },
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
    },
  ],
  loc: {
    address: {
      one: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  },
  promoCode: 'DISCOUNT10', // Optional
  giftCards: ['GC123456'], // Optional
});
```

### User

User profile and preferences management:

```typescript
// Create/update user session
const userSession = await client.user.session({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Smith',
  phone: '2125551234',
  company: 'Company Inc',
  profileImage: 'https://...',
  birthDate: '1990-01-01',
  id: 'user_id', // Existing user identifier (for updates only), email becomes optional
});

// Fetch user by ID or email
const userData = await client.user.fetch('user_id_or_email');

// Address management
const newAddress = await client.user.addAddress({
  userId: 'user_id',
  placesId: 'google_places_id', // Optional if providing address details
  one: '100 Madison St',
  two: 'Apt 4B',
  city: 'New York',
  state: 'NY',
  zip: '10004',
  country: 'US',
  lat: 40.7128, // Optional
  long: -74.006, // Optional
  type: ENUM_ADDRESS_TYPE.SHIPPING,
  isDefault: true,
});

const updatedAddress = await client.user.updateAddress({
  // Same parameters as addAddress
});

// Payment methods
const newPayment = await client.user.addPayment({
  customerId: 'customer_id',
  paymentMethodId: 'payment_method_id',
  isDefault: true,
});

const updatedPayment = await client.user.updatePayment({
  customerId: 'customer_id',
  paymentMethodId: 'payment_method_id',
  isDefault: true, // Required for updates
});

// Data removal
await client.user.purge('user_id_or_email');
await client.user.purgeAddress('address_id');
await client.user.purgePayment('customer_id', 'payment_id');
```

### Payment Element

The Payment Element is a secure and modern UI component for collecting payment details. It simplifies PCI compliance by handling all sensitive information within an iframe.

#### Prerequisites

Before mounting the Payment Element, you must create a payment session. This can be tied to a user, cart, or checkout.

```typescript
// Create a payment session to get a client secret
const paymentSession = await client.user.paymentSession({
  // Optionally link to a cart, checkout, or customer
  // cartId: 'your_cart_id',
  // checkoutToken: 'your_checkout_token',
  // customerId: 'your_customer_id',
  // customerEmail: 'your_customer_id',
});

const { key, secret } = paymentSession.data.session;
```

#### Integration

1.  **Initialize and Mount**

    The `LiquidCommercePaymentElement` function creates and manages the UI component.

    ```typescript
    // Initialize the payment element
    const paymentElement = LiquidCommercePaymentElement({
      session: {
        key, // Public key from payment session
        secret, // Client secret from payment session
      },
    });

    // Mount the element to a container in your DOM
    await paymentElement.mount({
      elementId: 'payment-element-container',
      appearance: {
        theme: 'night', // 'stripe' | 'night' | 'flat'
      },
      elementOptions: {
        layout: 'tabs', // 'tabs' | 'accordion' | 'auto'
      },
    });
    ```

2.  **Generate a Confirmation Token**

    Once the user has filled out the payment form, create a confirmation token. This token securely represents the payment details.

    ```typescript
    const result = await paymentElement.createConfirmationToken();

    if (result.token) {
      // Token successfully created
      const confirmationToken = result.token;
      // Use this token to complete the checkout or save the payment method
    } else {
      // Handle error
      console.error(result.message);
    }
    ```

3.  **Confirm the Payment Session**

    Use the confirmation token to finalize the payment and retrieve the payment method details.

    ```typescript
    const confirmation = await client.user.confirmPaymentSession(confirmationToken);

    if (confirmation.data) {
      const paymentMethod = confirmation.data;
      // Now you have the payment method ID, card details, etc.
      // e.g., paymentMethod.id, paymentMethod.card.brand
    }
    ```

4.  **Lifecycle Management**

    Properly manage the element's lifecycle to ensure a smooth user experience and resource cleanup.

    ```typescript
    // Listen to events
    paymentElement.subscribe('ready', () => {
      console.log('Payment element is ready.');
    });

    paymentElement.subscribe('change', (event) => {
      // Handle form state changes (e.g., enable/disable submit button)
    });

    // Clean up when the element is no longer needed
    paymentElement.unmount();
    paymentElement.destroy();
    ```

### Legacy Payment

The legacy payment system uses a previous version of our payment integration. For new integrations, we strongly recommend using the [Payment Element](#payment-element) for a more secure and flexible solution.

#### Prerequisites

1.  User Session Creation:

```typescript
// First create or get a user session
const userSession = await client.user.session({
  email: 'user@example.com',
  // ... other user details
});

// The session response includes necessary payment credentials
const { setupIntent, publicKey } = userSession.data.session;
```

#### Payment Element Integration

```typescript
// Initialize payment form using session credentials
await client.payment.mount({
  clientSecret: userSession.data.session.setupIntent, // Required: from session
  key: userSession.data.session.publicKey, // Required: from session
  elementId: 'payment-element-container', // Your DOM element ID
  appearance: {
    theme: 'night', // 'stripe' | 'night' | 'flat'
  },
  elementOptions: {
    layout: 'tabs', // 'tabs' | 'accordion' | 'auto'
  },
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
    switch (token.error.type) {
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
  cartId: 'cart_id',
  customer: {
    id: 'customer_id', // Optional
    email: 'customer@example.com',
    firstName: 'John',
    lastName: 'Smith',
    phone: '2125551234',
    birthDate: '1990-01-01',
  },
  hasAgeVerify: true,
  billingAddress: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'billing@example.com',
    phone: '2125551234',
    one: '123 Main St',
    two: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'US',
  },
  hasSubstitutionPolicy: true,
  isGift: true,
  billingSameAsShipping: false,
  giftOptions: {
    message: 'Happy Birthday!',
    recipient: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '2125555678',
    },
  },
  marketingPreferences: {
    canEmail: true,
    canSms: true,
  },
  deliveryTips: [
    {
      fulfillmentId: 'fulfillment_id',
      tip: 500, // Amount in cents
    },
  ],
   deliveryInstructions: [
    {
      fulfillmentId: 'fulfillment_id',
      instructions: "", // 250 Max characters
    },
  ],
  acceptedAccountCreation: true,
  scheduledDelivery: '2024-12-25T14:00:00Z',
  promoCode: 'DISCOUNT10', // Optional
  giftCards: ['GC123456'], // Optional
});

// Complete checkout
const completedCheckout = await client.checkout.complete({
  token: preparedCheckout.token,
  payment: 'payment_id',
});
```

#### Checkout Payment

For direct checkout payments, the flow is similar but uses the checkout session:

```typescript
// 1. First prepare the checkout
const preparedCheckout = await client.checkout.prepare({
  cartId: 'cart_id',
  // ... other checkout details
});

// 2. Initialize payment element with checkout session
const paymentElement = LiquidCommercePaymentElement({
  session: {
    key: preparedCheckout.data.payment.publicKey, // From checkout prepare response
    secret: preparedCheckout.data.payment.clientSecret, // From checkout prepare response
  }
});

// 3. Mount the element
await paymentElement.mount({
  elementId: 'payment-element-container',
  appearance: { theme: 'night' },
  elementOptions: { layout: 'tabs' },
});

// 4. Handle payment element events and create confirmation token
const result = await paymentElement.createConfirmationToken();

if (result.token) {
  // 5. Confirm the payment collected with the confirmation token
  const confirmation = await client.user.confirmPaymentSession(confirmationToken);

  if (confirmation?.data?.id) {
    // 6. Complete checkout with the confirmation token
    const completedCheckout = await client.checkout.complete({
      token: preparedCheckout.data.token,
      payment: confirmation?.data?.id,
    });
  }
}

// 7. Clean up
paymentElement.unmount();
paymentElement.destroy();
```

### Orders

Provides secure access to order data throughout the finalized states of the order lifecycle within the LiquidCommerce ecosystem.

```typescript
const orderClient = await LiquidCommerceOrders({
  userID: 'YOUR_ORDER_API_USER_ID',
  password: 'YOUR_ORDER_API_PASSWORD',
  env: LIQUID_COMMERCE_ENV.STAGE, // or PROD
});

// Fetch order details by ID or number
const orderResponse = await orderClient.order.fetch(/* reference id or order number */);
```

[Click here to access the docs for the order response structure](https://docs.liquidcommerce.cloud/types/order)

### Webhook

Webhook test services:

```typescript
// Test webhook endpoint
const webhookTestResult = await client.webhook.test(/* endpoint */);

// Response is a simple boolean indicating success or failure
// true = webhook test was successful
// false = webhook test failed
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