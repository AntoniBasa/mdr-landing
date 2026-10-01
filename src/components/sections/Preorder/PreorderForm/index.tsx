"use client";

import {
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
  type BaseSyntheticEvent,
  type ChangeEvent,
  type JSX,
} from "react";
import { Controller, useForm, useWatch, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/form/Field";
import { getDescribedByIds } from "@/components/ui/form/Field/field-ids";
import { HoneypotField } from "@/components/ui/form/HoneypotField";
import { Input } from "@/components/ui/form/Input";
import { Select } from "@/components/ui/form/Select";
import { Stepper } from "@/components/ui/form/Stepper";
import { Textarea } from "@/components/ui/form/Textarea";
import { findModelInList, isModelId } from "@/data/models";
import { formatPrice } from "@/data/specs";
import { HONEYPOT_FIELD, readHoneypotValue } from "@/lib/honeypot/honeypot";
import {
  getPreorderModel,
  getServerPreorderModel,
  setPreorderModel,
  subscribePreorderModel,
} from "@/lib/preorder-selection/preorder-selection";
import {
  COMMENT_MAX,
  preorderFieldNames,
  preorderSchema,
  QUANTITY_MAX,
  QUANTITY_MIN,
} from "@/lib/validation/preorder";
import type { DroneModel, ModelId } from "@/types/models";
import type { PreorderFieldErrors, PreorderInput, PreorderResponse } from "@/types/preorder";
import { PreorderSuccess } from "@/components/sections/Preorder/PreorderSuccess";
import type { PreorderReceipt } from "@/components/sections/Preorder/types";
import type { PreorderFormProps, QuantityFieldRenderProps } from "./types";

const PREORDERS_ENDPOINT: string = "/api/preorders";
const NETWORK_ERROR_MESSAGE: string = "Network error. Check your connection and try again.";
const UNKNOWN_ERROR_MESSAGE: string = "Something went wrong. Please try again.";

const enteringState: TargetAndTransition = { opacity: 0, y: 12 };
const visibleState: TargetAndTransition = { opacity: 1, y: 0 };
const leavingState: TargetAndTransition = { opacity: 0, y: -12 };
const swapTransition: Transition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] };

const createDefaultValues = (modelId: ModelId): PreorderInput => {
  return { name: "", email: "", model: modelId, quantity: 1, comment: "" };
};

const readPreorderResponse = async (response: Response): Promise<PreorderResponse | null> => {
  try {
    const responseBody: PreorderResponse = await response.json();

    return responseBody;
  } catch {
    return null;
  }
};

const PreorderForm = (props: PreorderFormProps): JSX.Element => {
  const { models, defaultModelId } = props;
  const formId: string = useId();
  const [serverError, setServerError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<PreorderReceipt | null>(null);

  const preselectedModelId: ModelId | null = useSyncExternalStore<ModelId | null>(
    subscribePreorderModel,
    getPreorderModel,
    getServerPreorderModel,
  );

  const form: UseFormReturn<PreorderInput> = useForm<PreorderInput>({
    resolver: zodResolver(preorderSchema),
    mode: "onTouched",
    defaultValues: createDefaultValues(defaultModelId),
  });
  const { register, control, handleSubmit, setValue, setError, reset, formState } = form;
  const { errors, isSubmitting } = formState;

  useEffect((): void => {
    if (preselectedModelId !== null) {
      setValue("model", preselectedModelId, { shouldDirty: true });
    }
  }, [preselectedModelId, setValue]);

  const selectedModelId: ModelId = useWatch({ control, name: "model" });
  const quantity: number = useWatch({ control, name: "quantity" });
  const comment: string = useWatch({ control, name: "comment" });
  const selectedModel: DroneModel = findModelInList(models, selectedModelId);

  const getFieldId = (fieldName: string): string => {
    return `${formId}-${fieldName}`;
  };

  const nameFieldId: string = getFieldId("name");
  const emailFieldId: string = getFieldId("email");
  const modelFieldId: string = getFieldId("model");
  const quantityFieldId: string = getFieldId("quantity");
  const commentFieldId: string = getFieldId("comment");
  const honeypotFieldId: string = getFieldId(HONEYPOT_FIELD);

  const hasNameError: boolean = errors.name !== undefined;
  const hasEmailError: boolean = errors.email !== undefined;
  const hasModelError: boolean = errors.model !== undefined;
  const hasQuantityError: boolean = errors.quantity !== undefined;
  const hasCommentError: boolean = errors.comment !== undefined;
  const hasServerError: boolean = serverError !== null;

  const applyServerFieldErrors = (fieldErrors: PreorderFieldErrors | undefined): void => {
    if (fieldErrors === undefined) {
      return;
    }

    for (const fieldName of preorderFieldNames) {
      const message: string | undefined = fieldErrors[fieldName];

      if (message !== undefined && message !== "") {
        setError(fieldName, { message }, { shouldFocus: true });
      }
    }
  };

  const submitPreorder = async (
    preorder: PreorderInput,
    event?: BaseSyntheticEvent,
  ): Promise<void> => {
    setServerError(null);

    let result: PreorderResponse | null = null;

    try {
      const response: Response = await fetch(PREORDERS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...preorder, [HONEYPOT_FIELD]: readHoneypotValue(event) }),
      });
      result = await readPreorderResponse(response);
    } catch {
      setServerError(NETWORK_ERROR_MESSAGE);
      return;
    }

    if (result === null) {
      setServerError(UNKNOWN_ERROR_MESSAGE);
      return;
    }

    if (!result.ok) {
      applyServerFieldErrors(result.fieldErrors);
      setServerError(result.error);
      return;
    }

    setReceipt({ ...preorder, id: result.id });
  };

  const handleModelChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const nextModelId: string = event.target.value;

    if (isModelId(nextModelId)) {
      setPreorderModel(nextModelId);
    }
  };

  const handleStartOver = (): void => {
    reset(createDefaultValues(preselectedModelId ?? defaultModelId));
    setReceipt(null);
  };

  const renderQuantityStepper = (renderProps: QuantityFieldRenderProps): JSX.Element => {
    const { field } = renderProps;

    return (
      <Stepper
        id={quantityFieldId}
        label="quantity"
        min={QUANTITY_MIN}
        max={QUANTITY_MAX}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
        name={field.name}
        aria-invalid={hasQuantityError}
        aria-describedby={getDescribedByIds(quantityFieldId, {
          hasHint: false,
          hasError: hasQuantityError,
        })}
      />
    );
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {receipt !== null ? (
        <motion.div
          key="success"
          initial={enteringState}
          animate={visibleState}
          exit={leavingState}
          transition={swapTransition}
        >
          <PreorderSuccess receipt={receipt} models={models} onReset={handleStartOver} />
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          aria-label="Pre-order form"
          onSubmit={handleSubmit(submitPreorder)}
          className="flex flex-col gap-5"
          initial={enteringState}
          animate={visibleState}
          exit={leavingState}
          transition={swapTransition}
        >
          <Field id={nameFieldId} label="Full name" error={errors.name?.message}>
            <Input
              id={nameFieldId}
              autoComplete="name"
              placeholder="Alex Rivera"
              aria-invalid={hasNameError}
              aria-describedby={getDescribedByIds(nameFieldId, {
                hasHint: false,
                hasError: hasNameError,
              })}
              {...register("name")}
            />
          </Field>

          <Field id={emailFieldId} label="Email" error={errors.email?.message}>
            <Input
              id={emailFieldId}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={hasEmailError}
              aria-describedby={getDescribedByIds(emailFieldId, {
                hasHint: false,
                hasError: hasEmailError,
              })}
              {...register("email")}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto]">
            <Field id={modelFieldId} label="Model" error={errors.model?.message}>
              <Select
                id={modelFieldId}
                aria-invalid={hasModelError}
                aria-describedby={getDescribedByIds(modelFieldId, {
                  hasHint: false,
                  hasError: hasModelError,
                })}
                {...register("model", { onChange: handleModelChange })}
              >
                {models.map((model: DroneModel): JSX.Element => (
                  <option key={model.id} value={model.id}>
                    {`${model.name} — ${formatPrice(model.specs.priceUsd)}`}
                  </option>
                ))}
              </Select>
            </Field>

            <Field id={quantityFieldId} label="Quantity" error={errors.quantity?.message}>
              <Controller control={control} name="quantity" render={renderQuantityStepper} />
            </Field>
          </div>

          <Field
            id={commentFieldId}
            label="Comment"
            optional
            hint={`${comment.length}/${COMMENT_MAX}`}
            error={errors.comment?.message}
          >
            <Textarea
              id={commentFieldId}
              rows={4}
              maxLength={COMMENT_MAX}
              placeholder="Delivery notes, questions, accessories you're interested in…"
              aria-invalid={hasCommentError}
              aria-describedby={getDescribedByIds(commentFieldId, {
                hasHint: true,
                hasError: hasCommentError,
              })}
              {...register("comment")}
            />
          </Field>

          <HoneypotField id={honeypotFieldId} />

          <dl className="mt-1 flex flex-col gap-2 border-t border-glass pt-5 text-button">
            <div className="flex justify-between gap-4 text-muted">
              <dt>
                {selectedModel.name} × {quantity}
              </dt>
              <dd className="tabular-nums">
                {formatPrice(selectedModel.specs.priceUsd * quantity)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="font-medium">Due today</dt>
              <dd className="text-lead font-light tabular-nums">{formatPrice(0)}</dd>
            </div>
          </dl>

          {hasServerError && (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-card border border-subtle bg-glass/40 px-5 py-3 text-button"
            >
              <CircleAlert aria-hidden="true" className="mt-px size-4 shrink-0" strokeWidth={1.75} />
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            variant="accent"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full disabled:opacity-80"
          >
            {isSubmitting && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
            {isSubmitting ? "Reserving…" : "Reserve now"}
          </Button>
          <p className="text-center text-button text-muted">
            No payment now. We&apos;ll email you before your drone ships.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export { PreorderForm };
