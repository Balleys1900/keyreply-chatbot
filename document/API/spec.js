var spec = {
  swagger: "2.0",
  info: {
    description: "API for chat bot to build e-commerce web",
    version: "1.0",
    title: "Chatbot API",
  },
  host: "localhost:8000",
  basePath: "/api/v1",
  tags: [
    {
      name: "user",
      description: "This API about user communicate with chatbot",
    },
  ],
  schemes: ["http"],
  paths: {
    "/login": {
      post: {
        tags: ["user"],
        summary: "Create new user",
        description:
          "check if user has in localStorage, create new if it doesn't",
        operationId: "createNewUserAccount",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "username",
            description: "username for add new account",
            type: "object",
            default: {
              username: "abc",
            },
          },
          {
            name: "Authorization",
            in: "header",
            description: "token to be passed as format: Bearer + Token",
            type: "string",
          },
        ],

        responses: {
          201: {
            schema: {
              $ref: "#/definitions/token",
            },
          },
          400: {
            description: "empty body",
            schema: {
              $ref: "#/definitions/badRequest",
            },
          },
          401: {
            description: "empty token",
            schema: {
              $ref: "#/definitions/Unauthorized",
            },
          },
          403: {
            description: "incorrect token",
            schema: {
              $ref: "#/definitions/forbidden",
            },
          },
        },
        security: [],
      },
    },
    "/chatbot": {
      post: {
        tags: ["user"],
        summary: "navigateNode",
        description: "",
        operationId: "getNextNode",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "currentNode",
            type: "object",
            default: {
              currentNode: {
                text: "Xem danh sách sản phẩm",
                event: "goto",
                data: "list_items",
              },
            },
            description: "information of next",
          },
          {
            name: "Authorization",
            in: "header",
            description: "token to be passed as format: Bearer + Token",
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "return information next node",
            schema: {
              $ref: "#/definitions/currentNode",
            },
          },
          403: {
            description: "incorrect token",
            schema: {
              $ref: "#/definitions/forbidden",
            },
          },
        },
        security: [],
      },
    },
  },
  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "api_key",
      in: "header",
    },
  },
  definitions: {
    token: {
      type: "object",
      properties: {
        token: {
          type: "string",
        },
      },
    },
    user: {
      type: "object",
      properties: {
        username: {
          type: "string",
        },
      },
    },
    currentNode: {
      type: "object",
      properties: {
        data: {
          type: "object",
        },
        event: {
          type: "string",
        },
        text: {
          type: "string",
        },
        thumb: {
          type: "string",
        },
      },
    },

    badRequest: {
      type: "object",
      properties: {
        status: {
          type: "string",
          default: "failed",
        },
        message: {
          type: "string",
          default: "bad request",
        },
      },
    },
    forbidden: {
      type: "object",
      properties: {
        status: {
          type: "string",
          default: "failed",
        },
        message: {
          type: "string",
          default: "Forbidden",
        },
      },
    },
    Unauthorized: {
      type: "object",
      properties: {
        status: {
          type: "string",
          default: "failed",
        },
        message: {
          type: "string",
          default: "Unauthorized",
        },
      },
    },
  },
};
