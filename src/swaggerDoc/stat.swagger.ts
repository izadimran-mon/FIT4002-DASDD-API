import { adDef } from "./definitions/adDef.swagger";
import { botDef } from "./definitions/botDef.swagger";
import { botAlignmentStatDef, dataDef } from "./definitions/statDef.swagger";
import { tagDef } from "./definitions/tagDef.swagger";

export const stat = {
  "/stats/bot-alignment": {
    get: {
      tags: ["Statistics"],
      summary: "Returns bot alignment stat",
      operationId: "getBotAlignmentStat",
      produces: ["application/json"],
      responses: {
        "200": {
          description: "successful operation",
          schema: {
            type: "array",
            items: botAlignmentStatDef,
          },
        },
      },
    },
  },

  "/stats/category": {
    get: {
      tags: ["Statistics"],
      summary: "Returns category stat",
      operationId: "getCategoryStat",
      produces: ["application/json"],
      responses: {
        "200": {
          description: "successful operation",
          schema: dataDef,
        },
      },
    },
  },

  "/stats/ad-count": {
    get: {
      tags: ["Statistics"],
      summary: "Returns ad count stat",
      operationId: "getAdCountStat",
      produces: ["application/json"],
      parameters: [
        {
          in: "query",
          name: "startDate",
          description: "Start date to get ad count. Default to current date",
          required: false,
          type: "string",
        },
      ],
      responses: {
        "200": {
          description: "successful operation",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                count: {
                  type: "integer",
                },
                date: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },

  "/stats/ad-stat": {
    get: {
      tags: ["Statistics"],
      summary: "Returns ad  stat",
      operationId: "getAdStat",
      produces: ["application/json"],
      responses: {
        "200": {
          description: "successful operation",
          schema: {
            type: "object",
            properties: {
              adTotal: {
                type: "integer",
              },
              adTagged: {
                type: "integer",
              },
              adPerBot: {
                type: "integer",
              },
            },
          },
        },
      },
    },
  },
};
