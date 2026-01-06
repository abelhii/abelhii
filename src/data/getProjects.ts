import { Project } from "@/payload-types";
import { PaginatedDocs } from "payload";

export const getProjects = async (): Promise<PaginatedDocs<Project>> => {
  const req = await fetch("/api/projects");
  const data = await req.json();

  return data;
};
