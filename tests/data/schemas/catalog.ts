const searchSchema = {
  "type": "object",
  "properties": {
    "statusCode": { "type": "integer" },
    "message": { "type": "string" },
    "metadata": {
      "type": "object",
      "properties": {
        "languages": {
          "type": "array",
          "items": { "type": "string" }
        },
        "timestamp": { "type": "integer" },
        "timezone": { "type": "string" },
        "requestId": { "type": "string" },
        "path": { "type": "string" },
        "version": { "type": "string" }
      },
      "required": ["languages", "timestamp", "timezone", "requestId", "path", "version"]
    },
    "navigation": {
      "type": "object",
      "properties": {
        "correctedQuery": { "type": "string" },
        "attributionToken": { "type": "string" },
        "currentPage": { "type": "integer" },
        "totalPages": { "type": "integer" },
        "totalCount": { "type": "integer" },
        "availableOrderBy": {
          "type": "array",
          "items": { "type": "string" }
        },
        "availableOrderDirection": {
          "type": "array",
          "items": { "type": "string" }
        },
        "cursor": {
          "type": "object",
          "properties": {
            "nextPageToken": { "type": "string" },
            "previousPageToken": { "type": "string" }
          },
          "required": ["nextPageToken", "previousPageToken"]
        },
        "filters": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "bucket": { "type": "string" },
              "values": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "value": { "type": ["string","integer","number"] },
                    "count": { "type": "integer" }
                  },
                  "required": ["value", "count"]
                }
              }
            },
            "required": ["bucket", "values"]
          }
        }
      },
      "required": [
        "correctedQuery",
        "attributionToken",
        "currentPage",
        "totalPages",
        "totalCount",
        "availableOrderBy",
        "availableOrderDirection",
        "cursor",
        "filters"
      ]
    },
    "products": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "salsifyGrouping": { "type": "string" },
          "name": { "type": "string" },
          "brand": { "type": "string" },
          "catPath": { "type": "string" },
          "category": { "type": "string" },
          "classification": { "type": "string" },
          "type": { "type": "string" },
          "subType": { "type": "string" },
          "region": { "type": "string" },
          "country": { "type": "string" },
          "material": { "type": "string" },
          "color": { "type": "string" },
          "flavor": { "type": "string" },
          "variety": { "type": "string" },
          "appellation": { "type": "string" },
          "abv": { "type": "string" },
          "proof": { "type": "string" },
          "age": { "type": "string" },
          "vintage": { "type": "string" },
          "description": { "type": "string" },
          "htmlDescription": { "type": "string" },
          "tastingNotes": { "type": "string" },
          "images": {
            "type": "array",
            "items": { "type": "string" }
          },
          "sizes": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": { "type": "string" },
                "upc": { "type": "string" },
                "size": { "type": "string" },
                "volume": { "type": "string" },
                "catPath": { "type": "string" },
                "uom": { "type": "string" },
                "container": { "type": "string" },
                "containerType": { "type": "string" },
                "pack": { "type": "boolean" },
                "packDesc": { "type": "string" },
                "image": { "type": "string" },
                "attributes": {
                  "type": "object",
                  "properties": {
                    "presale": {
                      "type": "object",
                      "properties": {
                        "canPurchaseOn": { "type": ["string","null"] },
                        "estimatedShipBy": { "type": ["string","null"] },
                        "language": { "type": "string" },
                        "isActive": { "type": "boolean" }
                      }
                    },
                    "engraving": {
                      "type": "object",
                      "properties": {
                        "status": { "type": "boolean" },
                        "maxLines": { "type": "integer" },
                        "maxCharsPerLine": { "type": "integer" },
                        "fee": { "type": "integer" },
                        "location": { "type": "string" }
                      }
                    }
                  }
                },
                "variants": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "partNumber": { "type": "string" },
                      "retailerId": { "type": "string" },
                      "modalities": {
                        "type": "array",
                        "items": { "type": "string" }
                      },
                      "price": { "type": "integer" },
                      "salePrice": { "type": "integer" },
                      "stock": { "type": "integer" },
                      "isEngravable": { "type": "boolean" },
                      "fulfillmentTypes": {
                        "type": "object"
                      },
                      "fulfillments": {
                        "type": "array",
                        "items": { "type": "string" }
                      }
                    }
                  }
                },
                "salsifyPid": { "type": "string" }
              },
              "required": ["id", "upc", "size", "volume", "catPath", "uom", "container", "containerType", "pack", "packDesc", "image", "attributes", "variants", "salsifyPid"]
            }
          },
          "attributes": { "type": "object" },
          "mainImage": { "type": "string" },
          "additionalImages": {
            "type": "array",
            "items": { "type": "string" }
          },
          "volume": { "type": "string" },
          "uom": { "type": "string" },
          "pack": { "type": "boolean" },
          "packDesc": { "type": "string" },
          "parentCo": { "type": "string" },
          "default": { "type": "boolean" },
          "priceInfo": {
            "type": "object",
            "properties": {
              "currency": { "type": "string" },
              "minimum": { "type": "integer" },
              "average": { "type": "integer" },
              "maximum": { "type": "integer" }
            }
          }
        },
        "required": ["id", "name", "brand", "category", "images", "sizes", "attributes", "mainImage", "default", "priceInfo"]
      }
    },
    "retailers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "platformFee": { "type": "integer" },
          "address": {
            "type": "object",
            "properties": {
              "one": { "type": "string" },
              "two": { "type": "string" },
              "city": { "type": "string" },
              "state": { "type": "string" },
              "zip": { "type": "string" },
              "lat": { "type": "number" },
              "long": { "type": "number" },
              "country": { "type": "string" }
            }
          },
          "fulfillments": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": { "type": "string" },
                "timezone": { "type": "string" },
                "type": { "type": "string" },
                "canEngrave": { "type": "boolean" },
                "productTypesAllowed": {
                  "type": "array",
                  "items": { "type": "string" }
                },
                "fees": {
                  "type": "object"
                },
                "expectation": {
                  "type": "object",
                  "properties": {
                    "detail": { "type": "string" },
                    "short": { "type": "string" }
                  }
                },
                "hours": { "type": "object" },
                "breaks": {
                  "type": "array",
                  "items": {}
                },
                "items": {
                  "type": "array",
                  "items": {}
                }
              }
            }
          }
        },
        "required": ["id", "name", "platformFee", "address", "fulfillments"]
      }
    }
  },
  "required": [
    "statusCode",
    "message",
    "metadata",
    "navigation",
    "products",
    "retailers"
  ]
}

const availabilitySchema = {
  "type": "object",
  "properties": {
    "statusCode": { "type": "integer" },
    "message": { "type": "string" },
    "metadata": {
      "type": "object",
      "properties": {
        "languages": {
          "type": "array",
          "items": { "type": "string" }
        },
        "timestamp": { "type": "integer" },
        "timezone": { "type": "string" },
        "requestId": { "type": "string" },
        "path": { "type": "string" },
        "version": { "type": "string" }
      },
      "required": [
        "languages",
        "timestamp",
        "timezone",
        "requestId",
        "path",
        "version"
      ]
    },
    "products": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "salsifyGrouping": { "type": "string" },
          "name": { "type": "string" },
          "brand": { "type": "string" },
          "catPath": { "type": "string" },
          "category": { "type": "string" },
          "classification": { "type": "string" },
          "type": { "type": "string" },
          "subType": { "type": "string" },
          "region": { "type": "string" },
          "country": { "type": "string" },
          "material": { "type": "string" },
          "color": { "type": "string" },
          "flavor": { "type": "string" },
          "variety": { "type": "string" },
          "appellation": { "type": "string" },
          "abv": { "type": "string" },
          "proof": { "type": "string" },
          "age": { "type": "string" },
          "vintage": { "type": "string" },
          "description": { "type": "string" },
          "htmlDescription": { "type": "string" },
          "tastingNotes": { "type": "string" },
          "images": {
            "type": "array",
            "items": { "type": "string" }
          },
          "sizes": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": { "type": "string" },
                "upc": { "type": "string" },
                "size": { "type": "string" },
                "volume": { "type": "string" },
                "catPath": { "type": "string" },
                "uom": { "type": "string" },
                "container": { "type": "string" },
                "containerType": { "type": "string" },
                "pack": { "type": "boolean" },
                "packDesc": { "type": "string" },
                "image": { "type": "string" },
                "attributes": {
                  "type": "object",
                  "properties": {
                    "presale": {
                      "type": "object",
                      "properties": {
                        "canPurchaseOn": { "type": [ "string", "null" ] },
                        "estimatedShipBy": { "type": [ "string", "null" ] },
                        "language": { "type": "string" },
                        "isActive": { "type": "boolean" }
                      }
                    },
                    "engraving": {
                      "type": "object",
                      "properties": {
                        "status": { "type": "boolean" },
                        "maxLines": { "type": "integer" },
                        "maxCharsPerLine": { "type": "integer" },
                        "fee": { "type": "integer" },
                        "location": { "type": "string" }
                      }
                    }
                  }
                },
                "variants": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "partNumber": { "type": "string" },
                      "retailerId": { "type": "string" },
                      "modalities": {
                        "type": "array",
                        "items": { "type": "string" }
                      },
                      "price": { "type": "integer" },
                      "salePrice": { "type": "integer" },
                      "stock": { "type": "integer" },
                      "isEngravable": { "type": "boolean" },
                      "fulfillmentTypes": { "type": "object" },
                      "fulfillments": {
                        "type": "array",
                        "items": { "type": "string" }
                      }
                    }
                  }
                },
                "salsifyPid": { "type": "string" }
              },
              "required": [ "id", "upc", "size", "volume", "catPath", "uom", "container", "containerType", "pack", "packDesc", "image", "attributes", "variants", "salsifyPid" ]
            }
          },
          "attributes": { "type": "object" },
          "mainImage": { "type": "string" },
          "additionalImages": {
            "type": "array",
            "items": { "type": "string" }
          },
          "volume": { "type": "string" },
          "uom": { "type": "string" },
          "pack": { "type": "boolean" },
          "packDesc": { "type": "string" },
          "parentCo": { "type": "string" },
          "default": { "type": "boolean" },
          "priceInfo": {
            "type": "object",
            "properties": {
              "currency": { "type": "string" },
              "minimum": { "type": "integer" },
              "average": { "type": "integer" },
              "maximum": { "type": "integer" }
            }
          }
        },
        "required": [
          "id", "name", "brand", "category", "images", "sizes", "attributes", "mainImage", "default", "priceInfo"
        ]
      }
    },
    "retailers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "platformFee": { "type": "integer" },
          "address": {
            "type": "object",
            "properties": {
              "one": { "type": "string" },
              "two": { "type": "string" },
              "city": { "type": "string" },
              "state": { "type": "string" },
              "zip": { "type": "string" },
              "lat": { "type": "number" },
              "long": { "type": "number" },
              "country": { "type": "string" }
            }
          },
          "fulfillments": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": { "type": "string" },
                "timezone": { "type": "string" },
                "type": { "type": "string" },
                "canEngrave": { "type": "boolean" },
                "productTypesAllowed": {
                  "type": "array",
                  "items": { "type": "string" }
                },
                "fees": { "type": "object" },
                "expectation": {
                  "type": "object",
                  "properties": {
                    "detail": { "type": "string" },
                    "short": { "type": "string" }
                  }
                },
                "hours": { "type": "object" },
                "breaks": { "type": "array", "items": {} },
                "items": { "type": "array", "items": {} }
              }
            }
          }
        },
        "required": ["id", "name", "platformFee", "address", "fulfillments"]
      }
    }
  },
  "required": [
    "statusCode", "message", "metadata", "products", "retailers"
  ]
}

export const catalogSchemas = {
  searchSchema,
  availabilitySchema
};
