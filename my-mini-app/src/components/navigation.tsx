import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "types/Menu";
import { BottomNavigation, Icon } from "zmp-ui";



const tabs :  Record<string, Menu> = {
    '/': {
        label: "Home",
        icon: <Icon icon="zi-home"/>,
    },
    
    '/weather': {
        label: "Weather",
        icon: <Icon icon="zi-info-circle"/>,
    },
    '/post': {
        label: "Post",
        icon: <Icon icon="zi-post"/>,
    },
    '/user': {
        label: "Profile",
        icon: <Icon icon="zi-user"/>,
    },

};

export type TabKeys = keyof typeof tabs;

export const  Navigation: FC = () => {
    const [activeTab, setActiveTab] = useState<TabKeys>("/");
    const navigate = useNavigate();
    return (
        <BottomNavigation 
            fixed   
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
        >
            {Object.keys(tabs).map((path: TabKeys) =>
             <BottomNavigation.Item
             key={path}
             label={tabs[path].label}
             icon={tabs[path].icon}
             activeIcon={tabs[path].activeIcon}
             onClick={() => navigate(path)}
           />
            )}

        </BottomNavigation>
    );
}

