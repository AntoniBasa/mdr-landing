const getAccordionTriggerId = (idPrefix: string, itemId: string): string => {
  return `${idPrefix}-trigger-${itemId}`;
};

const getAccordionPanelId = (idPrefix: string, itemId: string): string => {
  return `${idPrefix}-panel-${itemId}`;
};

export { getAccordionTriggerId, getAccordionPanelId };
