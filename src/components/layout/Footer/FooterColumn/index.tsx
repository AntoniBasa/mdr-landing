import type { JSX } from "react";
import type { FooterColumnProps } from "./types";

const FooterColumn = (props: FooterColumnProps): JSX.Element => {
  const { title, children } = props;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-button font-medium tracking-eyebrow text-muted uppercase">{title}</h2>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
};

export { FooterColumn };
