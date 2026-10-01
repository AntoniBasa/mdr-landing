"use client";

import type { JSX } from "react";
import { MotionConfig } from "framer-motion";
import type { MotionProviderProps } from "./types";

const MotionProvider = (props: MotionProviderProps): JSX.Element => {
  const { children } = props;

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};

export { MotionProvider };
