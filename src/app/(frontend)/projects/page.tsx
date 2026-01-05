import { getPayload, Payload } from "payload";
import { RichText } from "@payloadcms/richtext-lexical/react";

import payloadConfig from "@/payload.config";
import { RichTextField } from "@payloadcms/ui";

const getProjects = async (payload: Payload) => {
  const projects = await payload.find({
    collection: "projects",
    limit: 100,
    pagination: false,
  });
  return projects;
};

export default async function ProjectsPage() {
  const payload = await getPayload({ config: payloadConfig });
  const projects = await getProjects(payload);

  return (
    <div className="flex flex-col gap-4 p-8 bg-amber-800 text-white min-h-screen">
      Projects Page
      <div>
        {projects.docs.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-4 mx-auto mb-8 max-w-2xl"
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            {project.content && <RichText data={project.content} />}
          </div>
        ))}
      </div>
    </div>
  );
}
