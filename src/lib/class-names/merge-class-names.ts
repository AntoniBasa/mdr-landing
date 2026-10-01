import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge, type ClassNameValue } from "tailwind-merge";

const mergeTailwindClassNames: (...classNames: ClassNameValue[]) => string = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "lead", "nav", "button", "title", "stat"] }],
      tracking: [{ tracking: ["logo", "eyebrow"] }],
      rounded: [{ rounded: ["thumb", "pill", "card"] }],
    },
  },
});

const mergeClassNames = (...classValues: ClassValue[]): string => {
  return mergeTailwindClassNames(clsx(classValues));
};

export { mergeClassNames };
