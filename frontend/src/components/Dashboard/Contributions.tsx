import { useEffect } from 'react';
import tw, { styled, css } from 'twin.macro';

const Container = tw.div`
  w-full h-fit flex mb-4
`

const ColContainer = tw.div`
  w-[6.25%] flex-col
`

type BoxTheme = {
  [index: string]: string[];
  default: string[];
}

const boxColorChip: BoxTheme = {
  default: [
    `#484E55`,
    `#254648`,
    `#2b6e72`,
    `#32959b`,
    `#38bdc5`,
    `#3fe5ef`,
    `#3fe5ef`,
  ]
};

const Box = styled.div((props: { theme: string, count: number }) => [
  tw`w-[80%] pb-[80%] mx-[10%] my-[20%] rounded`,
  css`background: ${boxColorChip[props.theme][props.count]}`
]);

type History = {
  date: string;
  count: number;
}

interface ContributionsProps {
  histories: History[];
}

export default function Contributions({histories}: ContributionsProps) {
  const tmpData: number[][] = [];
  const todayDate = new Date();
  const todayDay = todayDate.getDay();

  for(let i=0; i<15; i++) {
    tmpData.push([]);
    tmpData[i].push(0);
  }
  for(let i=0; i<=todayDay; i++) {
    tmpData.push([]);
    tmpData[15].push(0);
  }

  useEffect(() => {
    if(histories === undefined) return;
    histories.forEach((history: History) => {
      const historyDate = Date.parse(history.date)
      const dateDiff = (todayDate.getTime() - historyDate) / (1000 * 60 * 60 * 24)
      if(dateDiff >= 7 * 16) return;
      tmpData[15 - Math.ceil(dateDiff / 7)][dateDiff % 7] = history.count;
    })
  }, [histories])
  
  return (
    <Container>
      {tmpData?.map((tmp, idx) => {
        return (
          <ColContainer key={idx}>
            {tmp?.map((t, index) => {
              return (
                <Box key={index} theme={"default"} count={t}>
                </Box>
              )
            })}
          </ColContainer>
        )
      })}
    </Container>
  )
}
