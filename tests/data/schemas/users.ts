const createUserSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["statusCode", "message", "metadata", "data"],
  "properties": {
    "statusCode": {
      "type": "integer"
    },
    "message": {
      "type": "string"
    },
    "metadata": {
      "type": "object",
      "required": ["languages", "timestamp", "timezone", "requestId", "path", "version"],
      "properties": {
        "languages": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "timestamp": {
          "type": "integer"
        },
        "timezone": {
          "type": "string"
        },
        "requestId": {
          "type": "string"
        },
        "path": {
          "type": "string"
        },
        "version": {
          "type": "string"
        }
      }
    },
    "data": {
      "type": "object",
      "required": [
        "id",
        "email",
        "firstName",
        "company",
        "lastName",
        "phone",
        "profileImage",
        "birthDate",
        "createdAt",
        "updatedAt",
        "addresses",
        "savedPayments",
        "session"
      ],
      "properties": {
        "id": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "firstName": {
          "type": "string"
        },
        "company": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "phone": {
          "type": ["string", "null"]
        },
        "profileImage": {
          "type": "string"
        },
        "birthDate": {
          "type": ["string", "null"]
        },
        "createdAt": {
          "type": "object"
        },
        "updatedAt": {
          "type": "object"
        },
        "addresses": {
          "type": "array",
          "items": {}
        },
        "savedPayments": {
          "type": "array",
          "items": {}
        },
        "session": {
          "type": "object",
          "required": ["key", "secret", "createdAt"],
          "properties": {
            "key": {
              "type": "string"
            },
            "secret": {
              "type": "string"
            },
            "createdAt": {
              "type": "object"
            }
          }
        }
      }
    }
  }
}

const getUserSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
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
        "requestId": { "type": "string"},
        "path": { "type": "string" },
        "version": { "type": "string" }
      },
      "required": ["languages", "timestamp", "timezone", "requestId", "path", "version"]
    },
    "data": {
      "type": "object",
      "properties": {
        "id":      { "type": "string"},
        "email":   { "type": "string" },
        "firstName":  { "type": "string" },
        "company":    { "type": "string" },
        "lastName":   { "type": "string" },
        "phone":      { "type": ["string", "null"] },
        "profileImage": { "type": "string" },
        "birthDate":    { "type": ["string", "null"]},
        "createdAt":    { "type": "string"},
        "updatedAt":    { "type": "string" },
        "addresses": {
          "type": "array",
          "items": { "type": "object" }
        },
        "savedPayments": {
          "type": "array",
          "items": { "type": "object" }
        }
      },
      "required": [
        "id", "email", "firstName", "company", "lastName", "phone", "profileImage",
        "birthDate", "createdAt", "updatedAt", "addresses", "savedPayments"
      ]
    }
  },
  "required": ["statusCode", "message", "metadata", "data"]
}

const deleteUserSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
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
        "requestId": { "type": "string"},
        "path": { "type": "string" },
        "version": { "type": "string" }
      },
      "required": [
        "languages", "timestamp", "timezone", "requestId", "path", "version"
      ]
    },
    "data": {
      "type": "object",
      "properties": {
        "deleted": { "type": "boolean" },
        "message": { "type": "string" }
      },
      "required": ["deleted", "message"]
    }
  },
  "required": ["statusCode", "message", "metadata", "data"]
}

const addressesSchema = {
  "type": "object",
  "properties": {
    "statusCode": {
      "type": "integer"
    },
    "message": {
      "type": "string"
    },
    "metadata": {
      "type": "object",
      "properties": {
        "languages": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "timestamp": {
          "type": "integer"
        },
        "timezone": {
          "type": "string"
        },
        "requestId": {
          "type": "string"
        },
        "path": {
          "type": "string"
        },
        "version": {
          "type": "string"
        }
      },
      "required": ["languages", "timestamp", "timezone", "requestId", "path", "version"]
    },
    "data": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
        },
        "type": {
          "type": "string"
        },
        "one": {
          "type": "string"
        },
        "two": {
          "type": ["string", "null"]
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        },
        "lat": {
          "type": "number"
        },
        "long": {
          "type": "number"
        },
        "placesId": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "createdAt": {
          "type": "object"
        },
        "updatedAt": {
          "type": "object"
        },
        "isDefault": {
          "type": "boolean"
        }
      },
      "required": [
        "id", "type", "one", "two", "city", "state", "zip",
        "lat", "long", "placesId", "country", "createdAt", "updatedAt", "isDefault"
      ]
    }
  },
  "required": ["statusCode", "message", "metadata", "data"]
}

const deleteAddressSchema = {
  "type": "object",
  "properties": {
    "statusCode": {
      "type": "integer"
    },
    "message": {
      "type": "string"
    },
    "metadata": {
      "type": "object",
      "properties": {
        "languages": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "timestamp": {
          "type": "integer"
        },
        "timezone": {
          "type": "string"
        },
        "requestId": {
          "type": "string"
        },
        "path": {
          "type": "string"
        },
        "version": {
          "type": "string"
        }
      },
      "required": ["languages", "timestamp", "timezone", "requestId", "path", "version"]
    },
    "data": {
      "type": "object",
      "properties": {
        "deleted": {
          "type": "boolean"
        },
        "message": {
          "type": "string"
        }
      },
      "required": ["deleted", "message"]
    }
  },
  "required": ["statusCode", "message", "metadata", "data"]
}

export const userSchemas = {
  createUserSchema,
  getUserSchema,
  deleteUserSchema,
  addressesSchema,
  deleteAddressSchema
};
