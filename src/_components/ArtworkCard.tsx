import Image from "next/image";
import Link from "next/link";

export default function ArtworkCard({
  id,
  name,
  artist,
  path,
}: {
  id: string;
  name: string;
  artist: string;
  path: string;
}) {
  return (
    <div className="relative group cursor-pointer">
      <Link
        className={`w-fit h-fit group cursor-pointer`}
        role="button"
        aria-label={name}
        tabIndex={0}
        href={encodeURI(`/gallery/${id}`)}
      >
        <div className="relative">
          <Image
            className="group-hover:opacity-65 transition-all object-cover"
            src={path.startsWith("/") ? path : `/${path}`} // Ensure the path starts with a leading slash
            alt={name}
            width={300}
            height={400}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
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
