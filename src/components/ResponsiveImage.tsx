import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  /** Path without extension, e.g. /assets/profile/hero. Expects .avif and .webp siblings. */
  base: string;
  /** Optional smaller variant base used below `smBreak` px. */
  smBase?: string;
  smBreak?: number;
  alt: string;
  priority?: boolean;
};

export default function ResponsiveImage({ base, smBase, smBreak = 767, alt, priority, ...img }: Props) {
  const sm = smBase ? `(max-width: ${smBreak}px)` : undefined;
  return (
    <picture>
      {smBase && <source media={sm} type="image/avif" srcSet={`${smBase}.avif`} />}
      {smBase && <source media={sm} type="image/webp" srcSet={`${smBase}.webp`} />}
      <source type="image/avif" srcSet={`${base}.avif`} />
      <img
        src={`${base}.webp`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
        {...img}
      />
    </picture>
  );
}
