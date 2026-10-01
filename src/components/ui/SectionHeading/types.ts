type SectionHeadingAlignment = "start" | "center";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: SectionHeadingAlignment;
  className?: string;
};

export type { SectionHeadingAlignment, SectionHeadingProps };
