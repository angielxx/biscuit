import React from 'react';
import tw, { styled, TwStyle } from 'twin.macro';

// Styled component
type TabBarItemStatus = 'inactive' | 'active';

interface TabItemStylesTypes {
  [index: string]: TwStyle;
  inactive: TwStyle;
  active: TwStyle;
}

const TabItemStyles: TabItemStylesTypes = {
  inactive: tw`text-dark-grey40 border-b border-transparent`,
  active: tw`border-b border-primary text-main-bold text-primary`,
};

const TabItemContainer = styled.div<{ status: TabBarItemStatus }>`
  ${tw`flex gap-4 p-4 justify-center items-center w-full cursor-pointer`}
  ${(props) => TabItemStyles[props.status]}
`;

interface TabBarItemProps {
  title: string;
  icon: any;
  status: TabBarItemStatus;
  onClick: () => void;
}

const TabBarItem = ({ title, icon, status, onClick }: TabBarItemProps) => {
  return (
    <TabItemContainer status={status} onClick={onClick}>
      {React.cloneElement(icon, {
        className: status === 'active' ? 'fill-primary' : 'fill-dark-grey40',
      })}
      <span>{title}</span>
    </TabItemContainer>
  );
};

export default TabBarItem;
