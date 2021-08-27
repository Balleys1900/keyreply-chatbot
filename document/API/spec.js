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
    "/chatbot/history": {
      put: {
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
              chatArr: [
                {
                  buttons: [
                    {
                      data: "list_items",
                      event: "goto",
                      text: "Xem danh sách sản phẩm",
                    },
                    {
                      data: "conversation_end",
                      event: "goto",
                      text: "Kết thúc mua sắm",
                    },
                  ],
                  id: "conversation_welcome",
                  isBotReply: true,
                  isShowItems: false,
                  text: "Chào mừng bạn đến với cửa hàng ABC",
                },
                {
                  isBotReply: false,
                  isShowItems: false,
                  text: "Xem danh sách sản phẩm",
                },
                {
                  buttons: [
                    {
                      data: {
                        key: "item_select",
                        next: {
                          data: "show_item:1",
                          event: "goto",
                        },
                        value: "1",
                      },
                      event: "capture",
                      text: "Bàn",
                      thumb:
                        "https://www.ikea.com/cz/en/images/products/ekedalen-extendable-table-dark-brown__0736963_pe740827_s5.jpg",
                    },
                    {
                      data: {
                        key: "item_select",
                        next: {
                          data: "show_item:2",
                          event: "goto",
                        },
                        value: "2",
                      },
                      event: "capture",
                      text: "Ghế",
                      thumb:
                        "https://www.ikea.com/mx/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg?f=s",
                    },
                    {
                      data: {
                        key: "item_select",
                        next: {
                          data: "show_item:3",
                          event: "goto",
                        },
                        value: "3",
                      },
                      event: "capture",
                      text: "Nệm",
                      thumb:
                        "https://www.ikea.com/mx/en/images/products/malm-bed-frame-high-black-brown-luroey__0638608_pe699032_s5.jpg",
                    },
                  ],
                  id: "list_items",
                  isBotReply: true,
                  isShowItems: true,
                  text: "Danh sách sản phẩm",
                },
                {
                  text: "Xem danh sách sản phẩm",
                },
                {
                  buttons: [
                    {
                      data: {
                        key: "item_select",
                        next: {
                          data: "show_item:1",
                          event: "goto",
                        },
                        value: "1",
                      },
                      event: "capture",
                      text: "Bàn",
                      thumb:
                        "https://www.ikea.com/cz/en/images/products/ekedalen-extendable-table-dark-brown__0736963_pe740827_s5.jpg",
                    },
                    {
                      data: {
                        key: "item_select",
                        next: {
                          data: "show_item:2",
                          event: "goto",
                        },
                        value: "2",
                      },
                      event: "capture",
                      text: "Ghế",
                      thumb:
                        "https://www.ikea.com/mx/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg?f=s",
                    },
                    {
                      data: {
                        key: "item_select",
                        next: {
                          data: "show_item:3",
                          event: "goto",
                        },
                        value: "3",
                      },
                      event: "capture",
                      text: "Nệm",
                      thumb:
                        "https://www.ikea.com/mx/en/images/products/malm-bed-frame-high-black-brown-luroey__0638608_pe699032_s5.jpg",
                    },
                  ],
                  id: "list_items",
                  isBotReply: true,
                  isShowItems: true,
                  text: "Danh sách sản phẩm",
                },
              ],
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
              $ref: "#/definitions/updateChatLog",
            },
          },
          503: {
            description: "Server Error",
            schema: { $ref: "#/definitions/serverError" },
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
    serverError: {
      type: "object",
      properties: {
        status: {
          type: "string",
          default: "failed",
        },
        message: {
          type: "string",
          default: "Internal server error",
        },
      },
    },
    updateChatLog: {
      type: "object",
      properties: {
        status: {
          type: "string",
          default: "success",
        },
        message: {
          type: "string",
          default: "Update Success",
        },
      },
    },
  },
};
