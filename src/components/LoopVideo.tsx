import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  alt?: string;
  eager?: boolean;
};

export function LoopVideo({ src, poster, className, alt, eager }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (eager) {
      video.play().catch(() => {});
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "200px", threshold: 0.1 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [eager]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      muted
      loop
      playsInline
      autoPlay={eager}
      preload={eager ? "auto" : "metadata"}
      aria-label={alt}
    />
  );
}
