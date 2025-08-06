# [1.9.0-beta.3](https://github.com/liquidcommerce/cloud-sdk/compare/v1.9.0-beta.2...v1.9.0-beta.3) (2025-08-06)


### Features

* **payment:** add optional variables property to appearance configuration ([e2a3385](https://github.com/liquidcommerce/cloud-sdk/commit/e2a3385606f02c5d5eafa58236237cda731751cf))
* **payment:** update appearance configuration to include optional variables for styling ([41471f0](https://github.com/liquidcommerce/cloud-sdk/commit/41471f0ee41456bf3eb51eaa7155365df41fdc15))

# [1.9.0-beta.2](https://github.com/liquidcommerce/cloud-sdk/compare/v1.9.0-beta.1...v1.9.0-beta.2) (2025-08-06)


### Bug Fixes

* **checkout:** add validation for gift message length in giftOptions ([c32a318](https://github.com/liquidcommerce/cloud-sdk/commit/c32a3180f1d121abd762892bbe410b97b7e59223))
* **checkout:** update error message for gift message length validation ([37f8061](https://github.com/liquidcommerce/cloud-sdk/commit/37f80618d0566c320e35594359988d778d17320e))

# [1.9.0-beta.1](https://github.com/liquidcommerce/cloud-sdk/compare/v1.8.1-beta.1...v1.9.0-beta.1) (2025-07-02)


### Bug Fixes

* **cart:** change discount field in ICartAttributesPromoCode to required ([08d1920](https://github.com/liquidcommerce/cloud-sdk/commit/08d1920972c9ec70a0b673169aa70b6948bbd531))


### Features

* **cart:** add max quantity exceeded error codes to CART_EVENT_ENUM and ENUM_CHECKOUT_STATUS_CODE_ERROR ([b82d53d](https://github.com/liquidcommerce/cloud-sdk/commit/b82d53d4393a9465c481a67e8e68ef5ad6631820))
* **cart:** add optional discount field to ICartAttributesPromoCode interface ([78d51b2](https://github.com/liquidcommerce/cloud-sdk/commit/78d51b211d0f28270fac07d520ad1e179075135c))
* **catalog:** add optional maxQuantityPerOrder field to IProductSizeAttributes interface ([6f87559](https://github.com/liquidcommerce/cloud-sdk/commit/6f87559f0dee3441f1a7f7219837375ef20f82c5))
* **checkout:** add new error codes and update checkout event interface ([83ec210](https://github.com/liquidcommerce/cloud-sdk/commit/83ec2102124d445a15ec9ab8f50e905beec70283))
* **enums:** added RETAILER_ONDEMAND_HOURS_NOT_AVAILABLE enum on CART_EVENT_ENUM ([29fad73](https://github.com/liquidcommerce/cloud-sdk/commit/29fad73c1a6c31de78e4e2e8c51ed005c0b075b8))

## [1.8.1-beta.1](https://github.com/liquidcommerce/cloud-sdk/compare/v1.8.0...v1.8.1-beta.1) (2025-06-18)


### Bug Fixes

* **readme:** update auth example and improve payment flow details ([88bf241](https://github.com/liquidcommerce/cloud-sdk/commit/88bf241bf5fae0674c2644768391b7c0eb0874d8))

# [1.8.0-beta.2](https://github.com/liquidcommerce/cloud-sdk/compare/v1.8.0-beta.1...v1.8.0-beta.2) (2025-06-18)


### Bug Fixes

* **readme:** update auth example and improve payment flow details ([88bf241](https://github.com/liquidcommerce/cloud-sdk/commit/88bf241bf5fae0674c2644768391b7c0eb0874d8))

# [1.8.0-beta.1](https://github.com/liquidcommerce/cloud-sdk/compare/v1.7.0...v1.8.0-beta.1) (2025-06-17)


### Features

* **docs:** expand Payment Element and delivery instructions in README ([0df9cb3](https://github.com/liquidcommerce/cloud-sdk/commit/0df9cb362a7d7ae2927c58c94f02837882284dd2))

# [1.7.0-beta.4](https://github.com/liquidcommerce/cloud-sdk/compare/v1.7.0-beta.3...v1.7.0-beta.4) (2025-06-17)

### Bug Fixes

* add arizona state ([9fc2310](https://github.com/liquidcommerce/cloud-sdk/commit/9fc2310faa372ee496d8158f5c548c28a73608da))
* added some comments ([e2d6675](https://github.com/liquidcommerce/cloud-sdk/commit/e2d66752cab5fb32229821171758fbef8db157f0))
* **auth-service:** error response object ([69963a5](https://github.com/liquidcommerce/cloud-sdk/commit/69963a55844906d56b775c880cb354ce5f7aa733))
* **auth:** remove static singleton pattern from AuthenticatedService ([0f8983b](https://github.com/liquidcommerce/cloud-sdk/commit/0f8983bf5b4d9089985ffd99b1a1af2db2253ace))
* **core,interfaces:** improve presale attribute ([26af1ad](https://github.com/liquidcommerce/cloud-sdk/commit/26af1adb6abc80d67c98c3ef4f6651c13fdb6922))
* **core,interfaces:** improve readability with enhanced formatting and import structure ([628c87b](https://github.com/liquidcommerce/cloud-sdk/commit/628c87b2ac840d3315049945ad4dfb6b5810d7f9))
* **demo:** replace hardcoded API keys with placeholders ([253d4d8](https://github.com/liquidcommerce/cloud-sdk/commit/253d4d8eea9182b9be154bf7419c7f702a906380))
* **demo:** update environment to stage for SDK initialization ([7080a58](https://github.com/liquidcommerce/cloud-sdk/commit/7080a58741c916a1e74215473b63e4a923cfe889))
* **interface:** addressComponent response name ([d04990e](https://github.com/liquidcommerce/cloud-sdk/commit/d04990e7221e366958ad29faaa6a631165f63b89))
* **interface:** checkoutItem and cartItem interface update ([feead55](https://github.com/liquidcommerce/cloud-sdk/commit/feead55e535b7c534a6ac24cf9d378a3c76a33df))
* **interfaces, enums:** updated interfaces and enums related to presale ([a53c12b](https://github.com/liquidcommerce/cloud-sdk/commit/a53c12b36801d12e5aa495d2cfcc6d4cf8b5268b))
* **interfaces:** implement retailer fulfillment shipping min ([188dacb](https://github.com/liquidcommerce/cloud-sdk/commit/188dacb83038358474a63717e141b967b0701a9c))
* **presale:** removed internally used types ([dd21ebb](https://github.com/liquidcommerce/cloud-sdk/commit/dd21ebb54ac95e76e856fe0852ae1917806c1e0b))
* **presale:** updated date type ([c1cc4f8](https://github.com/liquidcommerce/cloud-sdk/commit/c1cc4f8e63f1a7dfe8ad38f65b9341565eaee6e9))
* **readme:** authentication readme docs ([7967b59](https://github.com/liquidcommerce/cloud-sdk/commit/7967b59c8df5602fbc53637a1bab917fcb11db2b))
* **README:** update readme file ([60899a5](https://github.com/liquidcommerce/cloud-sdk/commit/60899a555584c799affc5f33419476004394aa00))
* **webhook-test:** webhook test and refactor ([3620f49](https://github.com/liquidcommerce/cloud-sdk/commit/3620f4958c0e79c0129977d503186621d985029b))


### Features
* **docs:** expand Payment Element and delivery instructions in README ([0df9cb3](https://github.com/liquidcommerce/cloud-sdk/commit/0df9cb362a7d7ae2927c58c94f02837882284dd2))


# [1.7.0-beta.3](https://github.com/liquidcommerce/cloud-sdk/compare/v1.7.0-beta.2...v1.7.0-beta.3) (2025-06-17)


### Features

* **payment:** add payment session confirmation and enhance theme support ([ee05c36](https://github.com/liquidcommerce/cloud-sdk/commit/ee05c36a7663c1e759ac6b39875c7682d6c0c2eb))

# [1.7.0-beta.2](https://github.com/liquidcommerce/cloud-sdk/compare/v1.7.0-beta.1...v1.7.0-beta.2) (2025-06-10)


### Bug Fixes

* **auth:** remove static singleton pattern from AuthenticatedService ([0f8983b](https://github.com/liquidcommerce/cloud-sdk/commit/0f8983bf5b4d9089985ffd99b1a1af2db2253ace))

# [1.7.0-beta.1](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0...v1.7.0-beta.1) (2025-06-10)


### Bug Fixes

* add arizona state ([9fc2310](https://github.com/liquidcommerce/cloud-sdk/commit/9fc2310faa372ee496d8158f5c548c28a73608da))
* added some comments ([e2d6675](https://github.com/liquidcommerce/cloud-sdk/commit/e2d66752cab5fb32229821171758fbef8db157f0))
* **auth-service:** error response object ([69963a5](https://github.com/liquidcommerce/cloud-sdk/commit/69963a55844906d56b775c880cb354ce5f7aa733))
* **core,interfaces:** improve presale attribute ([26af1ad](https://github.com/liquidcommerce/cloud-sdk/commit/26af1adb6abc80d67c98c3ef4f6651c13fdb6922))
* **core,interfaces:** improve readability with enhanced formatting and import structure ([628c87b](https://github.com/liquidcommerce/cloud-sdk/commit/628c87b2ac840d3315049945ad4dfb6b5810d7f9))
* **demo:** replace hardcoded API keys with placeholders ([253d4d8](https://github.com/liquidcommerce/cloud-sdk/commit/253d4d8eea9182b9be154bf7419c7f702a906380))
* **demo:** update environment to stage for SDK initialization ([7080a58](https://github.com/liquidcommerce/cloud-sdk/commit/7080a58741c916a1e74215473b63e4a923cfe889))
* **interface:** addressComponent response name ([d04990e](https://github.com/liquidcommerce/cloud-sdk/commit/d04990e7221e366958ad29faaa6a631165f63b89))
* **interface:** checkoutItem and cartItem interface update ([feead55](https://github.com/liquidcommerce/cloud-sdk/commit/feead55e535b7c534a6ac24cf9d378a3c76a33df))
* **interfaces, enums:** updated interfaces and enums related to presale ([a53c12b](https://github.com/liquidcommerce/cloud-sdk/commit/a53c12b36801d12e5aa495d2cfcc6d4cf8b5268b))
* **interfaces:** implement retailer fulfillment shipping min ([188dacb](https://github.com/liquidcommerce/cloud-sdk/commit/188dacb83038358474a63717e141b967b0701a9c))
* **presale:** removed internally used types ([dd21ebb](https://github.com/liquidcommerce/cloud-sdk/commit/dd21ebb54ac95e76e856fe0852ae1917806c1e0b))
* **presale:** updated date type ([c1cc4f8](https://github.com/liquidcommerce/cloud-sdk/commit/c1cc4f8e63f1a7dfe8ad38f65b9341565eaee6e9))
* **readme:** authentication readme docs ([7967b59](https://github.com/liquidcommerce/cloud-sdk/commit/7967b59c8df5602fbc53637a1bab917fcb11db2b))
* **README:** update readme file ([60899a5](https://github.com/liquidcommerce/cloud-sdk/commit/60899a555584c799affc5f33419476004394aa00))
* **webhook-test:** webhook test and refactor ([3620f49](https://github.com/liquidcommerce/cloud-sdk/commit/3620f4958c0e79c0129977d503186621d985029b))


### Features

* add API key to headers in authenticated service and update webhook method parameter description ([57ca571](https://github.com/liquidcommerce/cloud-sdk/commit/57ca571f5efca870a6c403f84b0ce1dea6666214))
* add ENUM_ORDER_SYSTEM and update order interfaces for consistency ([dafc2bb](https://github.com/liquidcommerce/cloud-sdk/commit/dafc2bb935dd429ecd7b96240e595d8cd1a3ad7c))
* add webhook service and update documentation ([f5cc68c](https://github.com/liquidcommerce/cloud-sdk/commit/f5cc68c3098fed54cac78cb2a6f9ced6cabb2ca7))
* add webhook tab and test functionality ([7e0cfb7](https://github.com/liquidcommerce/cloud-sdk/commit/7e0cfb7ceb58e4250024ee8219565a14324ba948))
* **cart-helper:** adjust part number validation logic ([7ee8a8b](https://github.com/liquidcommerce/cloud-sdk/commit/7ee8a8b150bf6ebb15a41eaa48f75fdde7282059))
* **cart:** add presale attribute to ICartItemAttributes and IProductPresale interface ([51e1e93](https://github.com/liquidcommerce/cloud-sdk/commit/51e1e93236099725b00173dafec4f48ee98f2206))
* **checkout:** add gift card validation and update related interfaces ([fbf6722](https://github.com/liquidcommerce/cloud-sdk/commit/fbf6722297f6cc090d261ddfe1548df7b5e2dbcf))
* **client:** add payment session handling and enhance auth functionality ([5707f4b](https://github.com/liquidcommerce/cloud-sdk/commit/5707f4b1e14dd279a5e1bc041aa2719ab976505d))
* enhance webhook testing functionality and update documentation ([81ad69a](https://github.com/liquidcommerce/cloud-sdk/commit/81ad69ae64038ca68ad1d17e0a8c60919e684513))
* **enums:** add new error codes for coupon validation ([0a753d4](https://github.com/liquidcommerce/cloud-sdk/commit/0a753d49c7140fef856920da069520d49e2bc291))
* **filters:** add presale filter and refactor engraving validation ([1be292f](https://github.com/liquidcommerce/cloud-sdk/commit/1be292f868222216d017cb323777492814c54244))
* implement order authentication service and related client functionality ([79cfb4d](https://github.com/liquidcommerce/cloud-sdk/commit/79cfb4df21c02ad74f891037f139f2a6f7c2c2fe))
* **interface:** product price information ([672ffb1](https://github.com/liquidcommerce/cloud-sdk/commit/672ffb1d340e91d0281786abccc2181f66a21faa))
* order api ([23725a7](https://github.com/liquidcommerce/cloud-sdk/commit/23725a7948bb0884a11ff378ca620beddb50a454))
* remove mskus ([8344246](https://github.com/liquidcommerce/cloud-sdk/commit/8344246acb25c89ae24a6104206ecba74287586e))
* **rollup:** enhance build config with environment-based plugins and sourcemaps in dev mode ([28af620](https://github.com/liquidcommerce/cloud-sdk/commit/28af620d445679fabe1cde5e16add5509b93edd3))
* **search:** implement retailer filter ([ad9d4e8](https://github.com/liquidcommerce/cloud-sdk/commit/ad9d4e866d7be1442677a4e1a7f3da1f0bd23c63))
* update API keys to placeholders and change environment to dev ([b12eccb](https://github.com/liquidcommerce/cloud-sdk/commit/b12eccbc1b902603db99487c129aebb28f85c2a4))
* update interfaces & add comments ([3dbf323](https://github.com/liquidcommerce/cloud-sdk/commit/3dbf3234e2c15ed886d69321f5fc6b9e76552402))
* update webhook test method to accept an optional endpoint parameter ([a9a767d](https://github.com/liquidcommerce/cloud-sdk/commit/a9a767d621e43241911787835aa2672dea8bbb13))

# [1.6.0-beta.16](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.15...v1.6.0-beta.16) (2025-05-06)


### Bug Fixes

* **interface:** checkoutItem and cartItem interface update ([feead55](https://github.com/liquidcommerce/cloud-sdk/commit/feead55e535b7c534a6ac24cf9d378a3c76a33df))
* **readme:** authentication readme docs ([7967b59](https://github.com/liquidcommerce/cloud-sdk/commit/7967b59c8df5602fbc53637a1bab917fcb11db2b))
* **README:** update readme file ([60899a5](https://github.com/liquidcommerce/cloud-sdk/commit/60899a555584c799affc5f33419476004394aa00))
* **webhook-test:** webhook test and refactor ([3620f49](https://github.com/liquidcommerce/cloud-sdk/commit/3620f4958c0e79c0129977d503186621d985029b))


### Features

* add API key to headers in authenticated service and update webhook method parameter description ([57ca571](https://github.com/liquidcommerce/cloud-sdk/commit/57ca571f5efca870a6c403f84b0ce1dea6666214))
* add ENUM_ORDER_SYSTEM and update order interfaces for consistency ([dafc2bb](https://github.com/liquidcommerce/cloud-sdk/commit/dafc2bb935dd429ecd7b96240e595d8cd1a3ad7c))
* add webhook service and update documentation ([f5cc68c](https://github.com/liquidcommerce/cloud-sdk/commit/f5cc68c3098fed54cac78cb2a6f9ced6cabb2ca7))
* add webhook tab and test functionality ([7e0cfb7](https://github.com/liquidcommerce/cloud-sdk/commit/7e0cfb7ceb58e4250024ee8219565a14324ba948))
* enhance webhook testing functionality and update documentation ([81ad69a](https://github.com/liquidcommerce/cloud-sdk/commit/81ad69ae64038ca68ad1d17e0a8c60919e684513))
* implement order authentication service and related client functionality ([79cfb4d](https://github.com/liquidcommerce/cloud-sdk/commit/79cfb4df21c02ad74f891037f139f2a6f7c2c2fe))
* order api ([23725a7](https://github.com/liquidcommerce/cloud-sdk/commit/23725a7948bb0884a11ff378ca620beddb50a454))
* remove mskus ([8344246](https://github.com/liquidcommerce/cloud-sdk/commit/8344246acb25c89ae24a6104206ecba74287586e))
* update API keys to placeholders and change environment to dev ([b12eccb](https://github.com/liquidcommerce/cloud-sdk/commit/b12eccbc1b902603db99487c129aebb28f85c2a4))
* update interfaces & add comments ([3dbf323](https://github.com/liquidcommerce/cloud-sdk/commit/3dbf3234e2c15ed886d69321f5fc6b9e76552402))
* update webhook test method to accept an optional endpoint parameter ([a9a767d](https://github.com/liquidcommerce/cloud-sdk/commit/a9a767d621e43241911787835aa2672dea8bbb13))

# [1.6.0-beta.15](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.14...v1.6.0-beta.15) (2025-03-17)


### Bug Fixes

* **auth-service:** error response object ([69963a5](https://github.com/liquidcommerce/cloud-sdk/commit/69963a55844906d56b775c880cb354ce5f7aa733))

# [1.6.0-beta.14](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.13...v1.6.0-beta.14) (2025-03-13)


### Bug Fixes

* added some comments ([e2d6675](https://github.com/liquidcommerce/cloud-sdk/commit/e2d66752cab5fb32229821171758fbef8db157f0))
* **interface:** addressComponent response name ([d04990e](https://github.com/liquidcommerce/cloud-sdk/commit/d04990e7221e366958ad29faaa6a631165f63b89))

# [1.6.0-beta.13](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.12...v1.6.0-beta.13) (2025-03-06)


### Bug Fixes

* add arizona state ([9fc2310](https://github.com/liquidcommerce/cloud-sdk/commit/9fc2310faa372ee496d8158f5c548c28a73608da))

# [1.6.0-beta.12](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.11...v1.6.0-beta.12) (2025-02-19)


### Features

* **interface:** product price information ([672ffb1](https://github.com/liquidcommerce/cloud-sdk/commit/672ffb1d340e91d0281786abccc2181f66a21faa))

# [1.6.0-beta.11](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.10...v1.6.0-beta.11) (2025-02-11)


### Bug Fixes

* **interfaces, enums:** updated interfaces and enums related to presale ([a53c12b](https://github.com/liquidcommerce/cloud-sdk/commit/a53c12b36801d12e5aa495d2cfcc6d4cf8b5268b))
* **presale:** removed internally used types ([dd21ebb](https://github.com/liquidcommerce/cloud-sdk/commit/dd21ebb54ac95e76e856fe0852ae1917806c1e0b))
* **presale:** updated date type ([c1cc4f8](https://github.com/liquidcommerce/cloud-sdk/commit/c1cc4f8e63f1a7dfe8ad38f65b9341565eaee6e9))

# [1.6.0-beta.10](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.9...v1.6.0-beta.10) (2024-12-17)


### Features

* **cart-helper:** adjust part number validation logic ([7ee8a8b](https://github.com/liquidcommerce/cloud-sdk/commit/7ee8a8b150bf6ebb15a41eaa48f75fdde7282059))

# [1.6.0-beta.9](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.8...v1.6.0-beta.9) (2024-12-13)


### Features

* **checkout:** add gift card validation and update related interfaces ([fbf6722](https://github.com/liquidcommerce/cloud-sdk/commit/fbf6722297f6cc090d261ddfe1548df7b5e2dbcf))

# [1.6.0-beta.8](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.7...v1.6.0-beta.8) (2024-12-04)


### Features

* **enums:** add new error codes for coupon validation ([0a753d4](https://github.com/liquidcommerce/cloud-sdk/commit/0a753d49c7140fef856920da069520d49e2bc291))

# [1.6.0-beta.7](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.6...v1.6.0-beta.7) (2024-11-26)


### Features

* **search:** implement retailer filter ([ad9d4e8](https://github.com/liquidcommerce/cloud-sdk/commit/ad9d4e866d7be1442677a4e1a7f3da1f0bd23c63))

# [1.6.0-beta.6](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.5...v1.6.0-beta.6) (2024-11-26)


### Bug Fixes

* **interfaces:** implement retailer fulfillment shipping min ([188dacb](https://github.com/liquidcommerce/cloud-sdk/commit/188dacb83038358474a63717e141b967b0701a9c))

# [1.6.0-beta.5](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.4...v1.6.0-beta.5) (2024-11-26)


### Bug Fixes

* **core,interfaces:** improve presale attribute ([26af1ad](https://github.com/liquidcommerce/cloud-sdk/commit/26af1adb6abc80d67c98c3ef4f6651c13fdb6922))

# [1.6.0-beta.4](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.3...v1.6.0-beta.4) (2024-11-24)


### Bug Fixes

* **core,interfaces:** improve readability with enhanced formatting and import structure ([628c87b](https://github.com/liquidcommerce/cloud-sdk/commit/628c87b2ac840d3315049945ad4dfb6b5810d7f9))

# [1.6.0-beta.3](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.2...v1.6.0-beta.3) (2024-11-24)


### Features

* **filters:** add presale filter and refactor engraving validation ([1be292f](https://github.com/liquidcommerce/cloud-sdk/commit/1be292f868222216d017cb323777492814c54244))

# [1.6.0-beta.2](https://github.com/liquidcommerce/cloud-sdk/compare/v1.6.0-beta.1...v1.6.0-beta.2) (2024-11-24)


### Features

* **cart:** add presale attribute to ICartItemAttributes and IProductPresale interface ([51e1e93](https://github.com/liquidcommerce/cloud-sdk/commit/51e1e93236099725b00173dafec4f48ee98f2206))

# [1.6.0-beta.1](https://github.com/liquidcommerce/cloud-sdk/compare/v1.5.0...v1.6.0-beta.1) (2024-11-22)


### Features

* **payment:** updated payment default method and corrected response type ([6c43004](https://github.com/liquidcommerce/cloud-sdk/commit/6c43004ea566350a6258c239b640d1a62a343732))

# [1.5.0](https://github.com/liquidcommerce/cloud-sdk/compare/v1.4.0...v1.5.0) (2024-11-15)

### Features
* **readme:** replace logo markdown with HTML for better styling ([8f910bd](https://github.com/liquidcommerce/cloud-sdk/commit/8f910bd8aae1f5090bbc0c8b7dbfc5c61d6889c8))

# [1.4.0-beta.3](https://github.com/liquidcommerce/cloud-sdk/compare/v1.4.0-beta.2...v1.4.0-beta.3) (2024-11-22)

### Features
* **payment:** updated payment default method and corrected response type ([6c43004](https://github.com/liquidcommerce/cloud-sdk/commit/6c43004ea566350a6258c239b640d1a62a343732))

# [1.4.0](https://github.com/liquidcommerce/cloud-sdk/compare/v1.3.0...v1.4.0) (2024-11-15)

### Bug Fixes
* **demo:** correct SDK script URL and environment setting for staging ([9e1e9d3](https://github.com/liquidcommerce/cloud-sdk/commit/9e1e9d3208e3cb1d1a958aea1ca1b038e7755a18))
* exported all types and created billing address interface ([740436e](https://github.com/liquidcommerce/cloud-sdk/commit/740436e98ec17d584380d6a6988314a5db702243))
* **interfaces:** add user management methods to LiquidCommerceClient ([6d815d3](https://github.com/liquidcommerce/cloud-sdk/commit/6d815d376fff3e328720040565e6df419c66726f))
* **payment:** correct confirmSession return type and improve error handling ([509ce11](https://github.com/liquidcommerce/cloud-sdk/commit/509ce110a4f7fddbccd88535277f8d38d60d9ffb))
* removed an extra div at address isDefault ([e1ecf99](https://github.com/liquidcommerce/cloud-sdk/commit/e1ecf99ff7964bb556abe3bc40959bbf913a993c))

### Features
* added engraving at cart list item ([5bbf167](https://github.com/liquidcommerce/cloud-sdk/commit/5bbf16769b4854eaf8e2bc8c95d81dffea25e94e))
* Added no data for addresses/payments text and is default checkbox for addresses ([70e2628](https://github.com/liquidcommerce/cloud-sdk/commit/70e26281ea3b41a519604703e86a44ed76c67dc6))
* added retailers for each product in cart and show event message when getting cart ([c12c730](https://github.com/liquidcommerce/cloud-sdk/commit/c12c7308517f4e6a177c59c0f0c9aa6ec9c8ed4e))
* **cart:** add docs cart to checkout interface ([355752a](https://github.com/liquidcommerce/cloud-sdk/commit/355752a8f7c92a193f9ba2deb8f10a2439688908))
* **cart:** correct retailer type in cart interface ([297811a](https://github.com/liquidcommerce/cloud-sdk/commit/297811a26c226a78ac7ffc398c3d32c29fd1f202))
* **catalog:** add support for tags filter and flavored whiskey category ([6921ba8](https://github.com/liquidcommerce/cloud-sdk/commit/6921ba8072757b732a4bb11edb151bc7542c7229))
* **checkout:** add detailed total amounts interfaces ([6b18212](https://github.com/liquidcommerce/cloud-sdk/commit/6b18212b9130feed4840cfdec60a22e79a0581b7))
* **checkout:** add referenceId to checkout interface ([e369ef6](https://github.com/liquidcommerce/cloud-sdk/commit/e369ef656ccefd06eadc4b4aed70e27b62f0b2fa))
* **checkout:** expand customer and billing interfaces, add deprecation notes ([598764f](https://github.com/liquidcommerce/cloud-sdk/commit/598764f9f9be75e7fcb1aad01ee8281ac55e6bd9))
* **checkout:** format phone numbers in validateAndNormalizePrepareParams ([f1e63ad](https://github.com/liquidcommerce/cloud-sdk/commit/f1e63ad46689e1d9e9825d34a421a41181820b6e))
* **checkout:** make fields optional in checkout interfaces ([5d4556b](https://github.com/liquidcommerce/cloud-sdk/commit/5d4556b8a18dec621521a726e23b7dde4b0c799c))
* **checkout:** make fields optional in checkout interfaces ([47c4773](https://github.com/liquidcommerce/cloud-sdk/commit/47c4773635785ba0eab7d9e1491bcfe99d1e85f3))
* **constants:** add JSDoc comments for DEFAULT_BASE_URLS in core.constant.ts ([2333f9d](https://github.com/liquidcommerce/cloud-sdk/commit/2333f9df5bb55223b1f4a10fd281fd73eced3749))
* **core:** enhance validation and normalization logic for location and catalog services ([6d25c08](https://github.com/liquidcommerce/cloud-sdk/commit/6d25c081cb29918981ee997d76469625e1248bf6))
* **core:** improve address validation and normalization for checkout flow ([8397a74](https://github.com/liquidcommerce/cloud-sdk/commit/8397a744b15683d2c0d7167b71b7d3b0daabca47))
* **interfaces:** add payment property to check out interface ([7cc8a58](https://github.com/liquidcommerce/cloud-sdk/commit/7cc8a5859c35d1c27baa0cb6bc336d5f258255de))
* **interfaces:** add shippingAddressTwo to check out interface ([fc033f3](https://github.com/liquidcommerce/cloud-sdk/commit/fc033f30c837a32a7aa87b963a185f709cfbc49a))
* **interfaces:** make checkout interface properties non-optional ([fd61ff2](https://github.com/liquidcommerce/cloud-sdk/commit/fd61ff2fce45810fb9f019a22319e6d459770be7))
* **interfaces:** remove unused catalog service interface and update catalog search and availability ([339ea8c](https://github.com/liquidcommerce/cloud-sdk/commit/339ea8c8d6e0eaae36e9326147bbb52490ef306e))
* **interfaces:** streamline checkout interfaces and improve typing consistency ([e62f54e](https://github.com/liquidcommerce/cloud-sdk/commit/e62f54ea152683a37691d548c5b405de3921b47d))
* **interfaces:** update checkout and catalog interfaces ([a91f238](https://github.com/liquidcommerce/cloud-sdk/commit/a91f23811964874d34cfd4e6533ee96783b9e750))
* **interfaces:** update ICheckoutCompleteResponse order property type ([614887d](https://github.com/liquidcommerce/cloud-sdk/commit/614887d2553746c449176d1a8e679def13279207))
* **payment:** add session confirmation and update AuthenticatedService handling ([0b6896b](https://github.com/liquidcommerce/cloud-sdk/commit/0b6896b75cc594dbbaf2fab9b3ab64fa0d563863))
* **README:** update SDK usage examples and add new sections for config and error handling ([faddb7c](https://github.com/liquidcommerce/cloud-sdk/commit/faddb7ce50a261ee54e71f5e4facd099b0b9a1d3))
* **user:** add fetch user by ID functionality and address update options ([8b5f6a8](https://github.com/liquidcommerce/cloud-sdk/commit/8b5f6a83a4b5f509a8c36681a47198a18749f99e))


# [1.4.0-beta.1](https://github.com/liquidcommerce/cloud-sdk/compare/v1.3.0...v1.4.0-beta.1) (2024-11-15)


### Bug Fixes

* **demo:** correct SDK script URL and environment setting for staging ([9e1e9d3](https://github.com/liquidcommerce/cloud-sdk/commit/9e1e9d3208e3cb1d1a958aea1ca1b038e7755a18))
* exported all types and created billing address interface ([740436e](https://github.com/liquidcommerce/cloud-sdk/commit/740436e98ec17d584380d6a6988314a5db702243))
* **interfaces:** add user management methods to LiquidCommerceClient ([6d815d3](https://github.com/liquidcommerce/cloud-sdk/commit/6d815d376fff3e328720040565e6df419c66726f))
* **payment:** correct confirmSession return type and improve error handling ([509ce11](https://github.com/liquidcommerce/cloud-sdk/commit/509ce110a4f7fddbccd88535277f8d38d60d9ffb))
* removed an extra div at address isDefault ([e1ecf99](https://github.com/liquidcommerce/cloud-sdk/commit/e1ecf99ff7964bb556abe3bc40959bbf913a993c))


### Features

* added engraving at cart list item ([5bbf167](https://github.com/liquidcommerce/cloud-sdk/commit/5bbf16769b4854eaf8e2bc8c95d81dffea25e94e))
* Added no data for addresses/payments text and is default checkbox for addresses ([70e2628](https://github.com/liquidcommerce/cloud-sdk/commit/70e26281ea3b41a519604703e86a44ed76c67dc6))
* added retailers for each product in cart and show event message when getting cart ([c12c730](https://github.com/liquidcommerce/cloud-sdk/commit/c12c7308517f4e6a177c59c0f0c9aa6ec9c8ed4e))
* **cart:** add docs cart to checkout interface ([355752a](https://github.com/liquidcommerce/cloud-sdk/commit/355752a8f7c92a193f9ba2deb8f10a2439688908))
* **cart:** correct retailer type in cart interface ([297811a](https://github.com/liquidcommerce/cloud-sdk/commit/297811a26c226a78ac7ffc398c3d32c29fd1f202))
* **catalog:** add support for tags filter and flavored whiskey category ([6921ba8](https://github.com/liquidcommerce/cloud-sdk/commit/6921ba8072757b732a4bb11edb151bc7542c7229))
* **checkout:** add detailed total amounts interfaces ([6b18212](https://github.com/liquidcommerce/cloud-sdk/commit/6b18212b9130feed4840cfdec60a22e79a0581b7))
* **checkout:** add referenceId to checkout interface ([e369ef6](https://github.com/liquidcommerce/cloud-sdk/commit/e369ef656ccefd06eadc4b4aed70e27b62f0b2fa))
* **checkout:** expand customer and billing interfaces, add deprecation notes ([598764f](https://github.com/liquidcommerce/cloud-sdk/commit/598764f9f9be75e7fcb1aad01ee8281ac55e6bd9))
* **checkout:** format phone numbers in validateAndNormalizePrepareParams ([f1e63ad](https://github.com/liquidcommerce/cloud-sdk/commit/f1e63ad46689e1d9e9825d34a421a41181820b6e))
* **checkout:** make fields optional in checkout interfaces ([5d4556b](https://github.com/liquidcommerce/cloud-sdk/commit/5d4556b8a18dec621521a726e23b7dde4b0c799c))
* **checkout:** make fields optional in checkout interfaces ([47c4773](https://github.com/liquidcommerce/cloud-sdk/commit/47c4773635785ba0eab7d9e1491bcfe99d1e85f3))
* **constants:** add JSDoc comments for DEFAULT_BASE_URLS in core.constant.ts ([2333f9d](https://github.com/liquidcommerce/cloud-sdk/commit/2333f9df5bb55223b1f4a10fd281fd73eced3749))
* **core:** enhance validation and normalization logic for location and catalog services ([6d25c08](https://github.com/liquidcommerce/cloud-sdk/commit/6d25c081cb29918981ee997d76469625e1248bf6))
* **core:** improve address validation and normalization for checkout flow ([8397a74](https://github.com/liquidcommerce/cloud-sdk/commit/8397a744b15683d2c0d7167b71b7d3b0daabca47))
* **interfaces:** add payment property to check out interface ([7cc8a58](https://github.com/liquidcommerce/cloud-sdk/commit/7cc8a5859c35d1c27baa0cb6bc336d5f258255de))
* **interfaces:** add shippingAddressTwo to check out interface ([fc033f3](https://github.com/liquidcommerce/cloud-sdk/commit/fc033f30c837a32a7aa87b963a185f709cfbc49a))
* **interfaces:** make checkout interface properties non-optional ([fd61ff2](https://github.com/liquidcommerce/cloud-sdk/commit/fd61ff2fce45810fb9f019a22319e6d459770be7))
* **interfaces:** remove unused catalog service interface and update catalog search and availability ([339ea8c](https://github.com/liquidcommerce/cloud-sdk/commit/339ea8c8d6e0eaae36e9326147bbb52490ef306e))
* **interfaces:** streamline checkout interfaces and improve typing consistency ([e62f54e](https://github.com/liquidcommerce/cloud-sdk/commit/e62f54ea152683a37691d548c5b405de3921b47d))
* **interfaces:** update checkout and catalog interfaces ([a91f238](https://github.com/liquidcommerce/cloud-sdk/commit/a91f23811964874d34cfd4e6533ee96783b9e750))
* **interfaces:** update ICheckoutCompleteResponse order property type ([614887d](https://github.com/liquidcommerce/cloud-sdk/commit/614887d2553746c449176d1a8e679def13279207))
* **payment:** add session confirmation and update AuthenticatedService handling ([0b6896b](https://github.com/liquidcommerce/cloud-sdk/commit/0b6896b75cc594dbbaf2fab9b3ab64fa0d563863))
* **README:** update SDK usage examples and add new sections for config and error handling ([faddb7c](https://github.com/liquidcommerce/cloud-sdk/commit/faddb7ce50a261ee54e71f5e4facd099b0b9a1d3))
* **user:** add fetch user by ID functionality and address update options ([8b5f6a8](https://github.com/liquidcommerce/cloud-sdk/commit/8b5f6a83a4b5f509a8c36681a47198a18749f99e))

# Changelog

# [1.3.0](https://github.com/liquidcommerce/cloud-sdk/compare/v1.2.0...v1.3.0) (2024-09-19)

### Features

* **payment:** add client secret validation and confirm setup intent in Stripe integration ([b00d90d](https://github.com/liquidcommerce/cloud-sdk/commit/b00d90d211c310911ceb1d3cd8251b884815b39e))
* **payment:** add collapse, unmount, and destroy methods for payment element ([bb3a51c](https://github.com/liquidcommerce/cloud-sdk/commit/bb3a51cc8534de8a4cb567ef3390765458dffd5f))
* **payments:** add user payment methods and demo UI enhancements ([e7d0130](https://github.com/liquidcommerce/cloud-sdk/commit/e7d0130928bc372989f43bda0e52f5f62e752576))
* **payments:** user payment method endpoints ([3ffc422](https://github.com/liquidcommerce/cloud-sdk/commit/3ffc42262d27232004402d6f40f1faad777500e0))
* **ui:** improve navbar and add mobile-friendly off-canvas menu ([68bc8d4](https://github.com/liquidcommerce/cloud-sdk/commit/68bc8d40fd793a7e415ae0783f70fb226866b7ff))
* **user:** add updatePayment method and params for user payment updates ([876b460](https://github.com/liquidcommerce/cloud-sdk/commit/876b46036a2a201516f944e7cd009d76f3e62509))

# [1.3.0-beta.29](https://github.com/liquidcommerce/cloud-sdk/compare/v1.3.0-beta.28...v1.3.0-beta.29) (2024-11-15)

### Features
* **README:** update SDK usage examples and add new sections for config and error handling ([faddb7c](https://github.com/liquidcommerce/cloud-sdk/commit/faddb7ce50a261ee54e71f5e4facd099b0b9a1d3))

# [1.3.0-beta.28](https://github.com/liquidcommerce/cloud-sdk/compare/v1.3.0-beta.27...v1.3.0-beta.28) (2024-11-15)

### Features
* **interfaces:** update checkout and catalog interfaces ([a91f238](https://github.com/liquidcommerce/cloud-sdk/commit/a91f23811964874d34cfd4e6533ee96783b9e750))

# [1.3.0-beta.27](https://github.com/liquidcommerce/cloud-sdk/compare/v1.3.0-beta.26...v1.3.0-beta.27) (2024-11-12)

### Features
* **constants:** add JSDoc comments for DEFAULT_BASE_URLS in core.constant.ts ([2333f9d](https://github.com/liquidcommerce/cloud-sdk/commit/2333f9df5bb55223b1f4a10fd281fd73eced3749))

# [1.2.0](https://github.com/liquidcommerce/cloud-sdk/compare/v1.1.1...v1.2.0) (2024-09-05)

### Features
* **demo:** add session-based payment initialization and improve cart id handling ([89c8048](https://github.com/liquidcommerce/cloud-sdk/commit/89c804808027a2e1f34bf69e2de99425f2cf696c))

## [1.1.1](https://github.com/liquidcommerce/cloud-sdk/compare/v1.1.0...v1.1.1) (2024-09-05)

### Bug Fixes
* **demo:** replace static data ([114b54d](https://github.com/liquidcommerce/cloud-sdk/commit/114b54d007e2d06a261df85273b738cc51f4fa45))

# [1.1.0](https://github.com/liquidcommerce/cloud-sdk/compare/v1.0.1...v1.1.0) (2024-09-03)

### Features
* **env:** update environment variable handling and streamline exports ([12ddb81](https://github.com/liquidcommerce/cloud-sdk/commit/12ddb81c6c6b56707d30bfa742ad65956ef443ad))

### Bug Fixes
* **ci:** remove changelog generation from deploy workflow ([0cda373](https://github.com/liquidcommerce/cloud-sdk/commit/0cda373358ed87815baa94289f31e397c14d2ca3))
* **deploy:** update version for semantic release ([6f01727](https://github.com/liquidcommerce/cloud-sdk/commit/6f017272ef496ebf110c567e6db3e40232cb52ac))
* **package:** update package name to @liquidcommerceteam/cloud-sdk ([b444aa7](https://github.com/liquidcommerce/cloud-sdk/commit/b444aa756105850ac863b447f5c09262f3b72d0b))

## [1.0.1](https://github.com/liquidcommerce/cloud-sdk/compare/v1.0.0...v1.0.1) (2024-09-01)

### Bug Fixes
* **enums, constants:** remove unused LOC and DEV environments ([7d1090d](https://github.com/liquidcommerce/cloud-sdk/commit/7d1090db18bc6f169094bc019c42b38899f6b20c))

# [1.0.0](https://github.com/liquidcommerce/cloud-sdk/compare/v1.0.0-beta.3...v1.0.0) (2024-09-01)

### Bug Fixes
* **enums, constants:** remove unused LOC and DEV environments ([7d1090d](https://github.com/liquidcommerce/cloud-sdk/commit/7d1090db18bc6f169094bc019c42b38899f6b20c))
