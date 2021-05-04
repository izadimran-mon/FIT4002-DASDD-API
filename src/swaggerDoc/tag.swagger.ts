import { tagDef } from "./definitions/tagDef.swagger";

export const tag = {
  "/tags": {
    get: {
      tags: ["Tag"],
      summary: "Returns tags",
      operationId: "getTags",
      produces: ["application/json"],
      responses: {
        "200": {
          description: "successful operation",
          schema: {
            type: "array",
            items: tagDef,
          },
        },
      },
    },
    post: {
      tags: ["Tag"],
      summary: "Create new tag",
      operationId: "createTag",
      produces: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "name",
          description: "tag name",
          required: true,
          type: "string",
        },
      ],
      responses: {
        "200": {
          description: "successful operation",
          schema: tagDef,
        },
      },
    },
  },

  "/tag/{id}": {
    get: {
      tags: ["Tag"],
      summary: "Returns a tag",
      operationId: "getTagById",
      produces: ["application/json"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "Tag id",
          required: true,
          type: "string",
        },
      ],
      responses: {
        "200": {
          description: "successful operation",
          schema: tagDef,
        },
      },
    },
  },
};
