const autocompleteAddressSchema = {
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
      "required": [
        "languages",
        "timestamp",
        "timezone",
        "requestId",
        "path",
        "version"
      ]
    },
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "description": {
            "type": "string"
          }
        },
        "required": [
          "id",
          "description"
        ]
      }
    }
  },
  "required": [
    "statusCode",
    "message",
    "metadata",
    "data"
  ]
}

const getAddressDetailsSchema = {
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
      "required": [
        "languages",
        "timestamp",
        "timezone",
        "requestId",
        "path",
        "version"
      ]
    },
    "data": {
      "type": "object"
    }
  },
  "required": [
    "statusCode",
    "message",
    "metadata",
    "data"
  ]
}

export const addressSchemas = {
  autocompleteAddressSchema,
  getAddressDetailsSchema,
};
