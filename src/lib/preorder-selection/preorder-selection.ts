import { isModelId } from "@/data/models";
import type { ModelId } from "@/types/models";
import type { PreorderModelListener, PreorderModelUnsubscribe } from "./types";

const PREORDER_ANCHOR: string = "preorder";

const MODEL_QUERY_PARAMETER: string = "model";

const listeners: Set<PreorderModelListener> = new Set<PreorderModelListener>();

const getPreorderHref = (modelId: ModelId): string => {
  return `?${MODEL_QUERY_PARAMETER}=${modelId}#${PREORDER_ANCHOR}`;
};

const getPreorderModel = (): ModelId | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const searchParameters: URLSearchParams = new URLSearchParams(window.location.search);
  const selectedValue: string | null = searchParameters.get(MODEL_QUERY_PARAMETER);

  if (isModelId(selectedValue)) {
    return selectedValue;
  }

  return null;
};

const getServerPreorderModel = (): ModelId | null => {
  return null;
};

const subscribePreorderModel = (
  listener: PreorderModelListener,
): PreorderModelUnsubscribe => {
  listeners.add(listener);
  window.addEventListener("popstate", listener);

  return (): void => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
};

const setPreorderModel = (modelId: ModelId, hash?: string): void => {
  const currentUrl: URL = new URL(window.location.href);
  currentUrl.searchParams.set(MODEL_QUERY_PARAMETER, modelId);

  if (hash !== undefined) {
    currentUrl.hash = hash;
  }

  window.history.replaceState(window.history.state, "", currentUrl);

  for (const listener of listeners) {
    listener();
  }
};

const selectPreorderModel = (modelId: ModelId): void => {
  setPreorderModel(modelId, PREORDER_ANCHOR);

  const preorderSection: HTMLElement | null = document.getElementById(PREORDER_ANCHOR);

  if (preorderSection === null) {
    return;
  }

  preorderSection.scrollIntoView({ block: "start" });

  if (!preorderSection.hasAttribute("tabindex")) {
    preorderSection.setAttribute("tabindex", "-1");
  }

  preorderSection.focus({ preventScroll: true });
};

export {
  PREORDER_ANCHOR,
  getPreorderHref,
  getPreorderModel,
  getServerPreorderModel,
  subscribePreorderModel,
  setPreorderModel,
  selectPreorderModel,
};
