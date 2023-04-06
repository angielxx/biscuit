import React from 'react';
import TabBarItem from './TabBarItem';
import tw, { styled } from 'twin.macro';

// Styled component
const TabContainer = styled.div`
  ${tw`flex`}
`;

interface tab {
  title: string;
  icon: any;
}

interface TabBarProps {
  tabList: tab[];
  onClick: React.Dispatch<React.SetStateAction<number>>;
  clickedTab: number;
  page: number;
}

const TabBar = ({ tabList, onClick, clickedTab, page }: TabBarProps) => {
  return (
    <TabContainer>
      {tabList.map((tab, index) => (
        <TabBarItem
          key={index}
          title={tab.title}
          icon={tab.icon}
          status={clickedTab === index || page === index ? 'active' : 'inactive'}
          onClick={() => onClick(index)}
        />
      ))}
    </TabContainer>
  );
};

export default TabBar;
