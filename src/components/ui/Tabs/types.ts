type TabItem<TabValue extends string> = {
  value: TabValue;
  label: string;
};

type TabsProps<TabValue extends string> = {
  items: readonly TabItem<TabValue>[];
  value: TabValue;
  onChange: (value: TabValue) => void;
  label: string;
  idPrefix: string;
  className?: string;
};

export type { TabItem, TabsProps };
