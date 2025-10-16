import Image from "next/image";
import Link from "next/link";

interface ArtworkCardProps {
  slug: string;
  name: string;
  artist: string;
  path: string;
}

export default function ArtworkCard({
  slug,
  name,
  artist,
  path,
}: ArtworkCardProps) {
  return (
    <div className="relative group cursor-pointer">
      <Link
        className={`w-fit h-fit group cursor-pointer`}
        role="button"
        aria-label={name}
        tabIndex={0}
        href={encodeURI(`/gallery/${slug}`)}
      >
        <div className="relative">
          <Image
            className="group-hover:opacity-65 transition-all object-cover"
            src={path}
            alt={name}
            width={300}
            height={400}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <div className="absolute top-0 bottom-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        <div className="absolute left-5 bottom-5 flex flex-col gap-1 text-white">
          <h3 className="text-xl font-bold break-words max-w-[220px]">
            {name}
          </h3>
          <p className="text-xs text-gray-300">{artist}</p>
        </div>
      </Link>
    </div>
  );
}
