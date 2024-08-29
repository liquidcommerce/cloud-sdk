![LiquidCommerce Logo](https://storage.googleapis.com/liquid-platform/repo_lc_dark.webp)

# LiquidCommerce Cloud SDK

The LiquidCommerce Cloud SDK provides an easy way to interact with our APIs through a server-side SDK for Node.js and Web JS script.

## Table of Contents

- [Installation](#installation)
- [Authentication](#authentication)
- [Usage](#usage)
- [Methods](#methods)
  - [Address](#address)
  - [Catalog](#catalog)
  - [Cart](#cart)
  - [User](#user)
  - [Payment](#payment)
  - [Checkout](#checkout)
- [Price Type](#price-type)
- [Documentation](#documentation)

## Installation

Install the package with:

```sh
npm install @liquidcommerce/cloud-sdk
# or
yarn add @liquidcommerce/cloud-sdk
```

## Authentication

The LiquidCommerce library uses API keys to authenticate requests. You can request your keys from your Partnerships liaison.

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

All API requests in production must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.

## Usage

```javascript
import LiquidCommerce from '@liquidcommerce/cloud-sdk';

// Your Account token provided to you through your account representative
const client = await LiquidCommerce('dev_******************', {
  googlePlacesApiKey: 'YOUR_GOOGLE_PLACES_API_KEY',
  env: 'stage' // or 'prod'
});

// Initialize the client
await client.init();
```

## Methods

### Address

The `address` method provides address autocompletion and details using Google Places API.

```javascript
// Address autocompletion
const autocompleteResults = await client.address.autocomplete({
  input: '100 Madison Ave, New York'
});

// Address details
const addressDetails = await client.address.details({
  id: 'ChIJd8BlQ2BZwokRjMKtTjMezRw'
});
```

### Catalog

The `catalog` method allows you to search and check availability of products in the LiquidCommerce catalog.

```javascript
// Check availability
const availabilityResponse = await client.catalog.availability({
  upcs: ['123456789012', '210987654321'],
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

// Search catalog
const searchResults = await client.catalog.search({
  search: 'whiskey',
  pageToken: '',
  page: 1,
  perPage: 20,
  orderBy: 'price',
  orderDirection: 'asc',
  filters: [
    { key: 'categories', values: ['SPIRITS > WHISKEY'] },
    { key: 'price', values: { min: 20, max: 100 } }
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

The `cart` method allows you to manage shopping carts.

```javascript
// Get an existing cart
const existingCart = await client.cart.get('existing_cart_id');

// Update cart
const updatedCart = await client.cart.update({
  id: 'existing_cart_id',
  items: [
    {
      id: 'item_id_1',
      partNumber: '123456789012_retailer_id',
      quantity: 2,
      engravingLines: ['Happy Birthday', 'John!'],
      fulfillmentId: 'fulfillment_id_1'
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

### User

The `user` method provides user management functionality.

```javascript
// Create or update user session
const userSession = await client.user.session({
  email: "user@example.com",
  firstName: "John"
});

// Update user address
const updatedAddress = await client.user.updateAddress({
  customerId: 'c1fbd454-a540-4f42-86e9-f87a98bf1812',
  one: '100 Madison St',
  city: 'New York',
  state: 'NY',
  zip: '10004',
  type: 'shipping',
  isDefault: true
});

// Purge user data
const purgeResponse = await client.user.purge('user@example.com');

// Purge user address
const addressPurgeResponse = await client.user.purgeAddress('26af8958-0deb-44ec-b9fd-ca150b198e45');
```

### Payment

The `payment` method handles secure payment processing.

```javascript
// Mount payment form
await client.payment.mount({
  clientSecret: 'client_secret_from_server',
  elementId: 'payment-element-container',
  appearance: { theme: 'night' },
  elementOptions: { layout: 'tabs' }
});

// Generate payment token
const token = await client.payment.generateToken();

// Subscribe to payment events
client.payment.subscribe('change', (event) => {
  console.log('Payment element changed:', event);
});

// Unsubscribe from payment events
client.payment.unsubscribe('change');
```

### Checkout

The `checkout` method manages the checkout process.

```javascript
// Prepare checkout
const preparedCheckout = await client.checkout.prepare({
  cartId: "65df5c***********512f",
  recipient: {
    firstName: "Jack",
    lastName: "Smith",
    email: "sample.jack@gmail.com",
    phone: "2129983315",
    birthDate: "11-22-1998",
    hasAgeVerify: false
  },
  billingAddress: {
    firstName: "Jenna",
    lastName: "Smith",
    email: "sample.jenna@gmail.com",
    phone: "2129983315",
    one: "251 Mercer St",
    city: "New York",
    state: "NY",
    zip: "10012"
  },
  hasSubstitutionPolicy: true,
  isGift: false,
  billingSameAsShipping: false,
  marketingPreferences: {
    canEmail: true,
    canSms: true
  },
  deliveryTips: [
    {
      fulfillmentId: "6570c3e********1910c105",
      tip: 2500
    }
  ]
});

// Complete checkout
const completedCheckout = await client.checkout.complete({
  token: "checkout_token_123",
  payment: "payment_id_456"
});
```

This method allows you to prepare and complete a checkout process. The `prepare` method sets up the checkout with all necessary details, while the `complete` method finalizes the checkout using a token and payment information.

## Price Type

All prices in our services are represented in the currency's subunit. For example, **$4.99** is output as **499**.

## Documentation

For more detailed information about each method and its parameters, please refer to our [official documentation](https://docs.liquidcommerce.co/cloud/getting-started).