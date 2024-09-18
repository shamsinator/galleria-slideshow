import Image from "next/image";
import Link from "next/link";

export default function ArtworkCard({
  name,
  artist,
  path,
}: {
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
        href={encodeURI(`/piece/${name}`)}
      >
        <Image
          className="w-full h-auto object-contain"
          src={path.startsWith("/") ? path : `/${path}`} // Ensure the path starts with a leading slash
          alt={name}
          width={300}
          height={400}
        />
        <div className="absolute top-0 w-full h-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
