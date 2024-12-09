import React, { useState } from "react";
import { Tabs, Button } from "antd";
import "./index.css";
type Tab = {
  key: string;
  label: React.ReactNode;
};

type CustomTabsProps = {
  tabs: Tab[];
  defaultActiveKey: string;
  onTabChange?: (key: string) => void;
};

const { TabPane } = Tabs;

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs = [],
  defaultActiveKey,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveKey);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (onTabChange) {
      onTabChange(key);
    }
  };

  return (
    <div className="custom-tabs">
      <Tabs defaultActiveKey={defaultActiveKey} onChange={handleTabChange}>
        {tabs.map(({ key, label }) => (
          <TabPane
            tab={
              <Button
                className={`w-[176px] ${activeTab === key ? "!bg-[#6417FE]" : "!bg-[#0D1521E5]"} w-auto py-2 px-3 !rounded-full !h-[46px] ${key !== tabs[0].key ? "ml-2" : ""}`}
                onClick={() => handleTabChange(key)}
              >
                {label}
              </Button>
            }
            key={key}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default CustomTabs;
