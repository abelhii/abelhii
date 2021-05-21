import * as functions from "firebase-functions";
import * as notionservice from "../services/notion";

export const projects = functions.https.onRequest(async (request, response) => {
  const projects = await notionservice.getProjects();
  response.json(projects);
});
