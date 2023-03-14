import React from 'react';

import tw, { styled, css } from 'twin.macro';

// Export interface for Button.stories.tsx
export interface FeedBackButtonProps {
  number: string;
  filled: boolean;
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
const FeedBackButton = ({ number, filled }: FeedBackButtonProps) => {
  return (
    <Btn filled={filled}>
      <Text>{number}</Text>
    </Btn>
  );
};

export default FeedBackButton;
