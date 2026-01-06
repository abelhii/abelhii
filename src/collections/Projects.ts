import { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "headerImage",
      type: "upload",
      relationTo: "media",
      required: true
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "tags",
      type: "array",
      unique: true,
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "content",
      type: "richText",
    },
  ],
};
