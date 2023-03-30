import tw, { styled, css } from 'twin.macro';

const ContentContainer = tw.div`w-full h-9 my-2`;
const Icon = tw.div`w-9 h-9`;
const BarContainer = tw.div``;
const GraphBar = tw.div``;
const GraphValue = tw.div``;


export default function GraphContent(data) {
  return (
    <ContentContainer>
      <Icon category={data.category}/>
      <BarContainer>
        <GraphBar count={data.count}/>
        <GraphValue count={data.count}/>
      </BarContainer>
    </ContentContainer>
  )
}
