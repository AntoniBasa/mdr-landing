import type { JSX } from "react";
import Image from "next/image";
import type { GalleryThumbnailsProps } from "./types";

const GalleryThumbnails = (props: GalleryThumbnailsProps): JSX.Element => {
  const { thumbnails, moreCount } = props;

  return (
    <div className="flex" role="img" aria-label={`Gallery: ${moreCount} more photos`}>
      {thumbnails.map((thumbnailPath: string, index: number): JSX.Element => (
        <div
          key={thumbnailPath}
          className="relative size-thumb shrink-0 overflow-hidden rounded-thumb not-first:-ml-[52px]"
          style={{ zIndex: index }}
        >
          <Image src={thumbnailPath} alt="" fill sizes="79px" className="object-cover" />
        </div>
      ))}
      <div className="relative z-10 -ml-[51px] flex size-thumb shrink-0 items-center justify-center rounded-thumb border border-fg bg-glass text-nav font-medium backdrop-blur-[10px]">
        +{moreCount}
      </div>
    </div>
  );
};

export { GalleryThumbnails };
