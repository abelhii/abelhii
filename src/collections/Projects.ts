import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'tags',
      type: 'array',
      unique: true,
      fields: [
        {
          name: 'tag',
          type: 'text',
        }
      ]
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
    }
  ],
}