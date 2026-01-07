import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayload, Payload } from "payload";

import payloadConfig from "@/payload.config";
import { Media } from "@/payload-types";

const getProject = async (payload: Payload, id: string) => {
  const projects = await payload.findByID({
    id,
    collection: "projects",
  });
  return projects;
};

function ProjectImage({ image }: { image: number | Media }) {
  if (typeof image === "number" || !image) return null;
  const url = image.url;
  const width = image.width ?? 500;
  const height = image.height ?? 500;

  return (
    <Image
      alt={image.alt ?? ""}
      src={url ?? ""}
      width={width}
      height={height}
      className={`object-cover`}
    />
  );
}

export default async function Page({ params }: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const payload = await getPayload({ config: payloadConfig });
  const project = await getProject(payload, id);

  return (
    <div className="p-16 bg-amber-800 text-white min-h-screen">
      <div className="flex flex-col gap-4 mx-auto mb-8 max-w-2xl">
        <h1 className="text-5xl">{project.title}</h1>
        <ProjectImage image={project.headerImage} />
        <p>{project.description}</p>
        {project.content && <RichText data={project.content} />}
      </div>
    </div>
  );
}
