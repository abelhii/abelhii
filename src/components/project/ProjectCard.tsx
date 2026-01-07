import { Media } from "@/payload-types";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import Link from "next/link";

function CardImage({ image }: { image: number | Media }) {
  if (typeof image === "number" || !image || !image.sizes) return null;

  const { card } = image.sizes;
  const url = image.url;
  const width = card?.width ?? image.width ?? 500;
  const height = card?.height ?? image.height ?? 500;

  return (
    <Image
      alt={image.alt ?? ""}
      src={url ?? ""}
      width={width}
      height={height}
      className={`backdrop-blur-xs opacity-80 h-48 md:h-64 object-cover`}
    />
  );
}

type ProjectCardProps = {
  id: number;
  title: string;
  image: number | Media;
  description?: string | null;
};

export function ProjectCard({
  id,
  title,
  image,
  description,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`}>
      <Card
        variant="space"
        effect="glow"
        className="w-xs sm:w-sm md:w-md cursor-pointer h-112 max-h-112 hover:border-gray-700"
      >
        <CardContent className="grid gap-4">
          <CardTitle className="font-bold text-xl">{title}</CardTitle>
          <CardImage image={image} />
          <CardDescription className="overflow-hidden line-clamp-3">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
}
