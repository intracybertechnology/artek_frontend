import { useEffect, useState } from "react";
import { heroPreloadImage } from "@/data/heroSlides";

const ROTATION_MS = 3000;
const slides = [
  heroPreloadImage.image,
  "/images/hero/slide2-biometric.webp",
  "/images/hero/slide3-access.webp",
  "/images/hero/slide4-entry.webp",
  "/images/hero/slide5-network.webp",
];

/** Fade the decorative photo without moving the hero copy or actions. */
export function HeroPicture() {
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [status, setStatus] = useState<Partial<Record<number, "loaded" | "failed">>>({});
  const [{ active, previous }, setSlide] = useState({ active: 0, previous: 0 });
  const readyToRotate = slides.slice(1).every((_, i) => status[i + 1]) &&
    slides.filter((_, i) => status[i] === "loaded").length > 1;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMotionAllowed(!preference.matches);
      if (preference.matches) setSlide({ active: 0, previous: 0 });
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!motionAllowed || !readyToRotate) return;
    const available = slides.flatMap((_, i) => status[i] === "loaded" ? [i] : []);
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setSlide(({ active }) => ({
        active: available[(available.indexOf(active) + 1) % available.length]!,
        previous: active,
      }));
    }, ROTATION_MS);
    return () => window.clearInterval(timer);
  }, [motionAllowed, readyToRotate, status]);

  function recordImage(index: number, result: "loaded" | "failed") {
    setStatus((current) => current[index] === result ? current : { ...current, [index]: result });
  }

  return (
    <>
      <div className="home-hero__picture" aria-hidden="true">
        {slides.map((src, index) => {
          if (index !== 0 && !(motionAllowed && status[0])) return null;
          return (
            <img
              key={src}
              className={`home-hero__slide${index === active ? " is-active" : index === previous ? " is-previous" : ""}`}
              src={src}
              width={heroPreloadImage.width}
              height={heroPreloadImage.height}
              alt=""
              decoding={index === 0 ? undefined : "async"}
              fetchPriority={index === 0 ? "high" : "low"}
              onLoad={() => recordImage(index, "loaded")}
              onError={() => recordImage(index, "failed")}
              ref={(image) => {
                if (image?.complete) recordImage(index, image.naturalWidth ? "loaded" : "failed");
              }}
            />
          );
        })}
      </div>
    </>
  );
}
