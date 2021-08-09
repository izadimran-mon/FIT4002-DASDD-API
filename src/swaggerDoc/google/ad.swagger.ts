import { googleAdDef } from "../definitions/adDef.swagger";
import { googleBotDef } from "../definitions/botDef.swagger";
import { googleTagDef } from "../definitions/tagDef.swagger";

export const ad = {
  "/google/ads": {
    get: {
      tags: ["/google"],
      summary: "Returns ads matching query",
      operationId: "getAds",
      produces: ["application/json"],
      parameters: [
        {
          in: "query",
          name: "offset",
          description: "record offset",
          required: false,
          type: "number",
        },
        {
          in: "query",
          name: "limit",
          description: "max number of records to return",
          required: false,
          type: "number",
        },
        {
          in: "query",
          name: "startDate",
          description:
            "Filter ads created after this date. This should be a timestamp in ms",
          required: false,
          type: "number",
        },
        {
          in: "query",
          name: "endDate",
          description:
            "Filter ads created before this date. This should be a timestamp in ms",
          required: false,
          type: "number",
        },
        {
          in: "query",
          name: "political",
          description:
            "Filter ads with one or more of the given bot political rankings",
          required: false,
          type: "array",
          collectionFormat: "multi",
          items: {
            type: "number",
          },
        },
        {
          in: "query",
          name: "gender",
          description: "Filter ads with one or more of the given bot genders",
          required: false,
          type: "array",
          collectionFormat: "multi",
          items: {
            type: "string",
          },
        },
        {
          in: "query",
          name: "tag",
          description: "Filter ads with one or more of the given tag names",
          required: false,
          type: "array",
          collectionFormat: "multi",
          items: {
            type: "number",
          },
        },
        {
          in: "query",
          name: "bots",
          description: "Bots to filter by",
          required: false,
          type: "array",
          collectionFormat: "multi",
          items: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "successful operation",
          schema: {
            type: "array",
            items: {
              allOf: [
                googleAdDef,
                {
                  type: "object",
                  properties: {
                    bot: googleBotDef,
                    tags: {
                      type: "array",
                      items: googleTagDef,
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  },

  "/google/ads/{id}": {
    get: {
      tags: ["/google"],
      summary: "Returns an ad",
      operationId: "getAdById",
      produces: ["application/json"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Ad id",
          required: true,
          type: "string",
        },
      ],
      responses: {
        "200": {
          description: "successful operation",
          schema: googleAdDef,
        },
      },
    },
  },
  "/google/ads/:id/tags/:tagId": {
    post: {
      tags: ["/google"],
      summary: "Attach a tag to an ad",
      operationId: "createAdTag",
      produces: ["application/json"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Ad id",
          required: true,
          type: "string",
        },
        {
          in: "path",
          name: "tagId",
          description: "Tag id",
          required: true,
          type: "integer",
        },
      ],
      responses: {
        "200": {
          description: "successful operation",
          schema: {
            allOf: [
              googleAdDef,
              {
                type: "object",
                properties: {
                  // bot: botDef,
                  tags: {
                    type: "array",
                    items: googleTagDef,
                  },
                },
              },
            ],
          },
        },
      },
    },

    delete: {
      tags: ["/google"],
      summary: "Remove a tag from an ad",
      operationId: "removeAdTag",
      produces: ["application/json"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Ad id",
          required: true,
          type: "string",
        },
        {
          in: "path",
          name: "tagId",
          description: "Tag id",
          required: true,
          type: "integer",
        },
      ],
      responses: {
        "200": {
          description: "successful operation",
        },
      },
    },
  },
};
