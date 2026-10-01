"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type JSX,
  type MouseEvent as ReactMouseEvent,
  type Touch as ReactTouch,
  type TouchEvent as ReactTouchEvent,
} from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
  type SpringOptions,
} from "framer-motion";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { DroneModel } from "@/types/models";
import type { EffectCleanup } from "@/types/react";
import { GalleryThumbnails } from "@/components/sections/Hero/GalleryThumbnails";
import { HeroHeading } from "@/components/sections/Hero/HeroHeading";
import { HeroStage } from "@/components/sections/Hero/HeroStage";
import { ModelList } from "@/components/sections/Hero/ModelList";
import { SlideControls } from "@/components/sections/Hero/SlideControls";
import type { HeroSliderProps, TouchPoint } from "./types";
import styles from "./styles.module.scss";

const PARALLAX_DISTANCE_PIXELS: number = 14;
const SWIPE_THRESHOLD_PIXELS: number = 50;
const PARALLAX_MEDIA_QUERY: string =
  "(hover: hover) and (pointer: fine) and (min-width: 1024px)";
const EDITABLE_TAG_NAMES: readonly string[] = ["INPUT", "TEXTAREA", "SELECT"];
const parallaxSpringOptions: SpringOptions = { stiffness: 80, damping: 20 };

const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return target.isContentEditable || EDITABLE_TAG_NAMES.includes(target.tagName);
};

const calculateParallaxOffset = (
  pointerPosition: number,
  areaStart: number,
  areaSize: number,
): number => {
  const centeredRatio: number = (pointerPosition - areaStart) / areaSize - 0.5;

  return centeredRatio * -2 * PARALLAX_DISTANCE_PIXELS;
};

const HeroSlider = (props: HeroSliderProps): JSX.Element => {
  const { models, initialIndex, imageAvailability, galleryThumbnails } = props;
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [isParallaxEnabled, setIsParallaxEnabled] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<TouchPoint | null>(null);
  const isInView: boolean = useInView(sectionRef, { amount: 0.5 });
  const shouldReduceMotion: boolean = useReducedMotion() === true;
  const pointerOffsetX: MotionValue<number> = useMotionValue<number>(0);
  const pointerOffsetY: MotionValue<number> = useMotionValue<number>(0);
  const parallaxX: MotionValue<number> = useSpring(pointerOffsetX, parallaxSpringOptions);
  const parallaxY: MotionValue<number> = useSpring(pointerOffsetY, parallaxSpringOptions);

  const activeModel: DroneModel = models[activeIndex];
  const modelCount: number = models.length;

  const showSlideByOffset = useCallback(
    (offset: number): void => {
      setActiveIndex((currentIndex: number): number => {
        return (currentIndex + offset + modelCount) % modelCount;
      });
    },
    [modelCount],
  );

  const showPreviousSlide = useCallback((): void => {
    showSlideByOffset(-1);
  }, [showSlideByOffset]);

  const showNextSlide = useCallback((): void => {
    showSlideByOffset(1);
  }, [showSlideByOffset]);

  useEffect((): EffectCleanup => {
    if (!isInView) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (isEditableTarget(event.target)) {
        return;
      }

      if (event.key === "ArrowLeft") {
        showPreviousSlide();
      }

      if (event.key === "ArrowRight") {
        showNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return (): void => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInView, showPreviousSlide, showNextSlide]);

  useEffect((): EffectCleanup => {
    const mediaQueryList: MediaQueryList = window.matchMedia(PARALLAX_MEDIA_QUERY);

    const updateParallaxEnabled = (): void => {
      setIsParallaxEnabled(mediaQueryList.matches && !shouldReduceMotion);
    };

    updateParallaxEnabled();
    mediaQueryList.addEventListener("change", updateParallaxEnabled);

    return (): void => {
      mediaQueryList.removeEventListener("change", updateParallaxEnabled);
    };
  }, [shouldReduceMotion]);

  const handleMouseMove = (event: ReactMouseEvent<HTMLElement>): void => {
    if (!isParallaxEnabled) {
      return;
    }

    const sectionBounds: DOMRect = event.currentTarget.getBoundingClientRect();

    pointerOffsetX.set(
      calculateParallaxOffset(event.clientX, sectionBounds.left, sectionBounds.width),
    );
    pointerOffsetY.set(
      calculateParallaxOffset(event.clientY, sectionBounds.top, sectionBounds.height),
    );
  };

  const handleMouseLeave = (): void => {
    pointerOffsetX.set(0);
    pointerOffsetY.set(0);
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLElement>): void => {
    const firstTouch: ReactTouch = event.touches[0];

    touchStartRef.current = { clientX: firstTouch.clientX, clientY: firstTouch.clientY };
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLElement>): void => {
    const touchStart: TouchPoint | null = touchStartRef.current;
    touchStartRef.current = null;

    if (touchStart === null) {
      return;
    }

    const lastTouch: ReactTouch = event.changedTouches[0];
    const horizontalDistance: number = lastTouch.clientX - touchStart.clientX;
    const verticalDistance: number = lastTouch.clientY - touchStart.clientY;
    const isTooShort: boolean = Math.abs(horizontalDistance) < SWIPE_THRESHOLD_PIXELS;
    const isMostlyVertical: boolean = Math.abs(horizontalDistance) < Math.abs(verticalDistance);

    if (isTooShort || isMostlyVertical) {
      return;
    }

    if (horizontalDistance < 0) {
      showNextSlide();
    } else {
      showPreviousSlide();
    }
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="MDR drone models"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={mergeClassNames("relative isolate overflow-hidden bg-bg", styles.hero)}
    >
      <HeroStage
        model={activeModel}
        hasImage={imageAvailability[activeModel.id]}
        shouldPrioritize={activeIndex === initialIndex}
        shouldReduceMotion={shouldReduceMotion}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />

      <HeroHeading model={activeModel} shouldReduceMotion={shouldReduceMotion} />

      <SlideControls onPreviousSlide={showPreviousSlide} onNextSlide={showNextSlide} />

      <div className="absolute inset-x-4 bottom-6 z-10 flex items-end justify-between sm:inset-x-6 md:bottom-[37px] lg:inset-x-gutter">
        <ModelList models={models} activeIndex={activeIndex} onSelect={setActiveIndex} />
        <div className={styles.thumbnails}>
          <GalleryThumbnails thumbnails={galleryThumbnails} moreCount={activeModel.galleryCount} />
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {`Model ${activeIndex + 1} of ${modelCount}: ${activeModel.name}`}
      </p>
    </section>
  );
};

export { HeroSlider };
