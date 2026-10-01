const getTabId = (idPrefix: string, value: string): string => {
  return `${idPrefix}-tab-${value}`;
};

const getTabPanelId = (idPrefix: string): string => {
  return `${idPrefix}-panel`;
};

export { getTabId, getTabPanelId };
