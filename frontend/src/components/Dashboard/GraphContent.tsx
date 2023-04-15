import tw, { styled, css } from 'twin.macro';
import Icon from '../common/Icon';

interface DataProps {
  data: {
    category: string;
    count: number;
  };
}

const ContentContainer = tw.div`flex w-full h-9 my-4`;
const BarContainer = tw.div`flex w-[85%] items-center`;
const GraphBar = styled.div((props: { count: number }) => [
  tw`flex h-1 rounded bg-primary mx-2`,
  css`
    width: ${props.count}%;
  `,
]);

const GraphValue = tw.span`text-sub text-grey70`;

export default function GraphContent({ data }: DataProps) {
  return (
    <ContentContainer>
      <Icon category={data.category} />
      <BarContainer>
        <GraphBar count={data.count * 0.9} />
        <GraphValue>{data.count > 100 ? `100+` : data.count}</GraphValue>
      </BarContainer>
    </ContentContainer>
  );
}
