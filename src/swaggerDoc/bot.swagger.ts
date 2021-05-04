import { adDef } from "./definitions/adDef.swagger";
import { botDef } from "./definitions/botDef.swagger";
import { tagDef } from "./definitions/tagDef.swagger";

export const bot = {
  "/bots": {
    get: {
      tags: ["Bot"],
      summary: "Returns bots matching query",
      operationId: "getBots",
      produces: ["application/json"],
      responses: {
        "200": {
          description: "successful operation",
          schema: {
            type: "array",
            items: botDef,
          },
        },
      },
    },
  },

  "/bots/{username}": {
    get: {
      tags: ["Bot"],
      summary: "Returns a bot",
      operationId: "getBotByUsername",
      produces: ["application/json"],
      parameters: [
        {
          in: "path",
          name: "username",
          description: "Bot username",
          required: true,
          type: "string",
        },
      ],
      responses: {
        "200": {
          description: "successful operation",
          schema: botDef,
        },
      },
    },
  },
};
