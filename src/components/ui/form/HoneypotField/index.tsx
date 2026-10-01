import type { JSX } from "react";
import { HONEYPOT_FIELD } from "@/lib/honeypot/honeypot";
import type { HoneypotFieldProps } from "./types";

const HoneypotField = (props: HoneypotFieldProps): JSX.Element => {
  const { id } = props;

  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>Website</label>
      <input id={id} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
};

export { HoneypotField };
