"use client";

import { useState } from "react";
import Image from "next/image";

import clsx from "clsx";

export default function ImageLoader({
  src,
  alt,
  width,
  height,
  className,
  loadingTransparent = false,
  onClick,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loadingTransparent?: boolean;
  onClick?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={clsx("relative")}>
      {isLoading && (
        <div
          className={clsx(
            className,
            "absolute inset-0 top-0 flex h-full w-full animate-pulse items-center justify-center shadow-none",
            loadingTransparent ? "bg-transparent" : "bg-slate-100",
          )}
        ></div>
      )}
      <Image
        draggable={false}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        onClick={onClick}
        className={clsx(
          `transition-opacity duration-300`,
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
      />
    </div>
  );
}
