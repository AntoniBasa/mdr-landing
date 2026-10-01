import * as zod from "zod";

const EMAIL_MAX_LENGTH: number = 254;

const newsletterSchema = zod.object({
  email: zod
    .string()
    .trim()
    .toLowerCase()
    .max(EMAIL_MAX_LENGTH, "Please enter a valid email address")
    .pipe(zod.email("Please enter a valid email address")),
});

export { EMAIL_MAX_LENGTH, newsletterSchema };
