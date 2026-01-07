"use client";

import { PaginatedDocs } from "payload";

import { Project } from "@/payload-types";
import { ProjectCard } from "./ProjectCard";

type ProjectCardListProps = {
  projects: PaginatedDocs<Project>;
};

export function ProjectCardList({ projects }: ProjectCardListProps) {
  return (
    <div className="grid gap-8 px-8 justify-center z-10">
      <h2 className="text-5xl font-bold">Projects</h2>
      <div
        className="
                    grid gap-8
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-[minmax(0,1fr)_1fr_minmax(0,1fr)]
                  "
      >
        {projects.docs.map((project, index) => {
          if (!project) return null;
          const { id, title, description, headerImage } = project;

          const isLeft = index % 2 === 0;

          return (
            <ProjectCard
              key={id}
              id={id}
              title={title}
              description={description}
              image={headerImage}
              className={`w-full ${isLeft ? "lg:col-start-1" : "lg:col-start-3"}`}
            />
          );
        })}
      </div>
    </div>
  );
}
