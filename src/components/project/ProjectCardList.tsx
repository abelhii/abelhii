"use client";

import { PaginatedDocs } from "payload";

import { Project } from "@/payload-types";
import { ProjectCard } from "./ProjectCard";

type ProjectCardListProps = {
  projects: PaginatedDocs<Project>;
};

export function ProjectCardList({ projects }: ProjectCardListProps) {
  return (
    <div className="flex gap-4 justify-center flex-wrap max-w-6xl p-8">
      {projects.docs.map((project) => {
        if (!project) return null;
        const { id, title, description, headerImage } = project;
        
        return (
          <ProjectCard
            key={id}
            id={id}
            title={title}
            description={description}
            image={headerImage}
          />
        );
      })}
    </div>
  );
}
