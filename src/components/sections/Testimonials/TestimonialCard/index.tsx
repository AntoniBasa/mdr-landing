import type { JSX } from "react";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { TestimonialCardProps } from "./types";

const MAX_RATING: number = 5;
const MAX_INITIALS: number = 2;
const starPositions: readonly number[] = [1, 2, 3, 4, 5];
const filledStarClassNames: string = "size-4 fill-current";
const emptyStarClassNames: string = "size-4 text-subtle";

const getInitials = (fullName: string): string => {
  const nameParts: string[] = fullName.split(" ");
  const firstLetters: string[] = nameParts.map((namePart: string): string => namePart[0]);

  return firstLetters.join("").slice(0, MAX_INITIALS).toUpperCase();
};

const TestimonialCard = (props: TestimonialCardProps): JSX.Element => {
  const { testimonial } = props;
  const { name, role, quote, rating } = testimonial;

  return (
    <Card className="flex h-full flex-col">
      <p className="flex gap-1">
        <span className="sr-only">{`Rated ${rating} out of ${MAX_RATING}`}</span>
        {starPositions.map((starPosition: number): JSX.Element => (
          <Star
            key={starPosition}
            aria-hidden="true"
            strokeWidth={1.5}
            className={starPosition <= rating ? filledStarClassNames : emptyStarClassNames}
          />
        ))}
      </p>

      <figure className="mt-6 flex flex-1 flex-col lg:mt-8">
        <blockquote className="flex-1 text-lead font-light">
          <p>&ldquo;{quote}&rdquo;</p>
        </blockquote>

        <figcaption className="mt-8 flex items-center gap-4 border-t border-glass pt-6">
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-pill border border-glass bg-glass text-button font-medium"
          >
            {getInitials(name)}
          </span>
          <span className="flex flex-col">
            <cite className="text-nav font-medium not-italic">{name}</cite>
            <span className="text-button text-muted">{role}</span>
          </span>
        </figcaption>
      </figure>
    </Card>
  );
};

export { TestimonialCard };
