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
      className={`backdrop-blur-xs opacity-80 w-full h-32 md:h-52 object-cover rounded-sm`}
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
        className="sm:w-sm md:w-md cursor-pointer md:h-96 md:max-h-96 hover:border-gray-700"
      >
        <CardContent className="grid gap-4">
          <CardImage image={image} />
          <CardTitle className="font-bold text-xl">{title}</CardTitle>
          <CardDescription className="overflow-hidden line-clamp-3">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
}
