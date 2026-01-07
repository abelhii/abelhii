import { Media } from "@/payload-types";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

function CardImage({ image }: { image: number | Media }) {
  if (typeof image === "number" || !image || !image.sizes) return null;

  const { card } = image.sizes;
  const url = image.url;
  const width = card?.width ?? image.width ?? 500;
  const height = card?.height ?? image.height ?? 500;

  console.log(url, width, height);

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
  title: string;
  image: number | Media;
  description?: string | null;
};

export function ProjectCard({ title, image, description }: ProjectCardProps) {
  return (
    <Card
      variant="space"
      effect="glow"
      className="w-xs sm:w-sm md:w-md cursor-pointer"
    >
      <CardContent className="grid gap-4">
        <CardTitle className="font-bold text-xl">{title}</CardTitle>
        <CardImage image={image} />
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
