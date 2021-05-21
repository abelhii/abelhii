import * as functions from "firebase-functions";
const { Client } = require("@notionhq/client");

// Init client
const notion = new Client({
  auth: functions.config().notionservice.token,
});

const database_id = functions.config().notionservice.dbid;

export async function getProjects() {
  const payload = {
    path: `databases/${database_id}/query`,
    method: "POST",
  };

  const { results } = await notion.request(payload);

  console.log(results);

  const projects = results.map((page: any) => {
    return {
      id: page.id,
      created_time: page.created_time,
      last_modified: page.last_edited_time,
      title: page.properties.Name.title[0]?.text?.content,
      blurb: page.properties.Blurb.rich_text[0]?.text?.content,
      tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
    };
  });

  return projects;
}

export async function getBlock(blockid: string) {
  const payload = {
    path: `blocks/${blockid}/children`,
    method: "GET",
  };

  const { results } = await notion.request(payload);

  console.log(results);

  const blocks = results.map((block: any) => {
    return block;
  });

  return blocks;
}
