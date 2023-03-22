import React from 'react';

import tw, { styled, css } from 'twin.macro';

export interface FeedBackButtonProps {
  number: number;
  filled: boolean;
  onClick: () => void;
}

// Styled component
const Btn = styled.div((props: { filled: boolean }) => [
  tw`w-11 h-11 rounded-full flex justify-center items-center`,
  props.filled
    ? tw`bg-primary text-black`
    : tw`border border-primary text-primary`,
]);
const Text = tw.span`text-sub`;

// Main component
const FeedBackButton = ({ number, filled, onClick }: FeedBackButtonProps) => {
  return (
    <Btn filled={filled} onClick={onClick}>
      <Text>{number}</Text>
    </Btn>
  );
};

export default FeedBackButton;
