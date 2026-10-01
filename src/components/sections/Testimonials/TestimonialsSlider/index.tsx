"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import { useReducedMotion } from "framer-motion";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { EffectCleanup } from "@/types/react";
import type { TestimonialSlide, TestimonialsSliderProps } from "./types";
import styles from "./styles.module.scss";

const isHtmlElement = (element: Element): element is HTMLElement => {
  return element instanceof HTMLElement;
};

const getStartPadding = (track: HTMLElement): number => {
  return parseFloat(getComputedStyle(track).paddingLeft);
};

const getSlideElements = (track: HTMLElement): HTMLElement[] => {
  return Array.from(track.children).filter(isHtmlElement);
};

const findClosestSlideIndex = (slideElements: HTMLElement[], snapLinePosition: number): number => {
  let closestIndex: number = 0;
  let closestDistance: number = Number.POSITIVE_INFINITY;

  slideElements.forEach((slideElement: HTMLElement, slideIndex: number): void => {
    const distance: number = Math.abs(slideElement.offsetLeft - snapLinePosition);

    if (distance < closestDistance) {
      closestIndex = slideIndex;
      closestDistance = distance;
    }
  });

  return closestIndex;
};

const findActiveSlideIndex = (track: HTMLElement): number => {
  const slideElements: HTMLElement[] = getSlideElements(track);
  const isAtEnd: boolean = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;

  if (isAtEnd) {
    return slideElements.length - 1;
  }

  const snapLinePosition: number = track.scrollLeft + getStartPadding(track);

  return findClosestSlideIndex(slideElements, snapLinePosition);
};

const TestimonialsSlider = (props: TestimonialsSliderProps): JSX.Element => {
  const { slides } = props;
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const shouldReduceMotion: boolean = useReducedMotion() === true;

  useEffect((): EffectCleanup => {
    const track: HTMLUListElement | null = trackRef.current;

    if (track === null) {
      return;
    }

    let animationFrameId: number = 0;

    const updateActiveIndex = (): void => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame((): void => {
        setActiveIndex(findActiveSlideIndex(track));
      });
    };

    track.addEventListener("scroll", updateActiveIndex, { passive: true });

    return (): void => {
      track.removeEventListener("scroll", updateActiveIndex);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSlide = (slideIndex: number): void => {
    const track: HTMLUListElement | null = trackRef.current;

    if (track === null) {
      return;
    }

    const slideElement: HTMLElement | undefined = getSlideElements(track)[slideIndex];

    if (slideElement === undefined) {
      return;
    }

    track.scrollTo({
      left: slideElement.offsetLeft - getStartPadding(track),
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div>
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Testimonials"
        className={mergeClassNames(
          "relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg",
          "lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0",
          styles.track,
        )}
      >
        {slides.map((slide: TestimonialSlide): JSX.Element => (
          <li
            key={slide.id}
            className="w-[85%] max-w-sm shrink-0 snap-start sm:w-[60%] lg:w-auto lg:max-w-none"
          >
            {slide.content}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center gap-2 lg:hidden">
        {slides.map((slide: TestimonialSlide, index: number): JSX.Element => {
          const isActive: boolean = index === activeIndex;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={(): void => scrollToSlide(index)}
              aria-label={`Show testimonial from ${slide.label}`}
              aria-current={isActive ? "true" : undefined}
              className="group flex h-6 items-center px-1"
            >
              <span
                className={mergeClassNames(
                  "block h-1.5 rounded-pill transition-all duration-300",
                  isActive ? "w-6 bg-fg" : "w-1.5 bg-subtle group-hover:bg-muted",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { TestimonialsSlider };
