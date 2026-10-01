import * as zod from "zod";
import { modelIds } from "@/data/models";
import type { PreorderField } from "@/types/preorder";

const NAME_MIN_LENGTH: number = 2;
const NAME_MAX_LENGTH: number = 80;
const QUANTITY_MIN: number = 1;
const QUANTITY_MAX: number = 5;
const COMMENT_MAX: number = 500;

const preorderFieldNames: readonly PreorderField[] = [
  "name",
  "email",
  "model",
  "quantity",
  "comment",
];

const preorderSchema = zod.object({
  name: zod
    .string()
    .trim()
    .min(NAME_MIN_LENGTH, "Please enter your full name")
    .max(NAME_MAX_LENGTH, `Name must be ${NAME_MAX_LENGTH} characters or less`),
  email: zod.string().trim().pipe(zod.email("Please enter a valid email address")),
  model: zod.enum(modelIds, "Please choose a model"),
  quantity: zod
    .number("Quantity must be a number")
    .int()
    .min(QUANTITY_MIN, `Minimum quantity is ${QUANTITY_MIN}`)
    .max(QUANTITY_MAX, `Maximum quantity is ${QUANTITY_MAX}`),
  comment: zod
    .string()
    .trim()
    .max(COMMENT_MAX, `Comment must be ${COMMENT_MAX} characters or less`),
});

export {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  QUANTITY_MIN,
  QUANTITY_MAX,
  COMMENT_MAX,
  preorderFieldNames,
  preorderSchema,
};
