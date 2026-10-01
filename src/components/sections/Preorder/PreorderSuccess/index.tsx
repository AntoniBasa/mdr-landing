"use client";

import { useEffect, useRef, type JSX } from "react";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { findModelInList } from "@/data/models";
import { formatPrice } from "@/data/specs";
import type { DroneModel } from "@/types/models";
import type { PreorderDelivery } from "@/types/preorder";
import type { PreorderSuccessProps } from "./types";

const REFERENCE_LENGTH: number = 12;

const getMissingVariableNames = (delivery: PreorderDelivery): string[] => {
  const missingVariableNames: string[] = [];

  if (!delivery.database) {
    missingVariableNames.push("MONGODB_URI");
  }

  if (!delivery.email) {
    missingVariableNames.push("RESEND_API_KEY");
  }

  return missingVariableNames;
};

const PreorderSuccess = (props: PreorderSuccessProps): JSX.Element => {
  const { receipt, models, onReset } = props;
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const model: DroneModel = findModelInList(models, receipt.model);
  const firstName: string = receipt.name.split(" ")[0];
  const totalPrice: string = formatPrice(model.specs.priceUsd * receipt.quantity);
  const missingVariableNames: string[] = getMissingVariableNames(receipt.delivery);
  const isDevelopment: boolean = process.env.NODE_ENV === "development";
  const shouldShowDevelopmentNote: boolean = isDevelopment && missingVariableNames.length > 0;
  const missingVariablesVerb: string = missingVariableNames.length > 1 ? "are" : "is";

  useEffect((): void => {
    const heading: HTMLHeadingElement | null = headingRef.current;

    if (heading !== null) {
      heading.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start gap-6">
      <span className="flex size-14 items-center justify-center rounded-pill border border-subtle bg-glass/40">
        <CircleCheck aria-hidden="true" className="size-6" strokeWidth={1.5} />
      </span>

      <div className="flex flex-col gap-3">
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl leading-tight font-light focus:outline-none"
        >
          You&apos;re on the list, {firstName}.
        </h3>
        <p className="text-nav text-muted">
          We&apos;ve reserved your drone and sent a confirmation to{" "}
          <span className="text-fg">{receipt.email}</span>.
        </p>
      </div>

      <dl className="flex w-full flex-col gap-3 rounded-card border border-glass bg-glass/40 p-5 text-button">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Model</dt>
          <dd>{model.name}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Quantity</dt>
          <dd className="tabular-nums">{receipt.quantity}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Total at shipping</dt>
          <dd className="tabular-nums">{totalPrice}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-glass pt-3">
          <dt className="text-muted">Reference</dt>
          <dd className="truncate font-mono text-muted">{receipt.id.slice(0, REFERENCE_LENGTH)}</dd>
        </div>
      </dl>

      {shouldShowDevelopmentNote && (
        <p className="rounded-card border border-dashed border-subtle px-5 py-3 text-button text-muted">
          Dev: {missingVariableNames.join(" and ")} {missingVariablesVerb} not set, so this
          pre-order was only logged to the server console.
        </p>
      )}

      <Button variant="outline" onClick={onReset}>
        Place another pre-order
      </Button>
    </div>
  );
};

export { PreorderSuccess };
