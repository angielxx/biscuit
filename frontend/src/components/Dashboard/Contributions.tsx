import { useState, useEffect } from 'react';
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
  css`background: ${boxColorChip[props.theme][props.count > 10 ? 6 : Math.ceil(props.count/2)]}`
]);

type History = {
  date: string;
  count: number;
}

interface ContributionsProps {
  histories: History[];
}

export default function Contributions({histories}: ContributionsProps) {

  const dateFormat = (date: Date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    const strMonth = month >= 10 ? month.toString() : '0' + month.toString();
    const strDay = day >= 10 ? day.toString() : '0' + day.toString();
    return date.getFullYear().toString() + '-' + strMonth + '-' + strDay;    
  }

  const tmpData: number[][] = [];
  const dateData = new Date();
  const todayDate = dateFormat(dateData);
  const todayDay = dateData.getDay();


  const [dashBoardState, setDashBoardState] = useState<number[][]>([]);

  for(let i=0; i<15; i++) {
    tmpData.push([]);
    for(let j=0; j<7; j++) {
      tmpData[i].push(0);
    }
  }
  tmpData.push([]);
  for(let i=0; i<=todayDay; i++) {
    tmpData[15].push(0);
  }

  useEffect(() => {
    if(histories === undefined) return;

    console.log(todayDate);

    histories.forEach((history: History) => {
      const historyDate = Date.parse(history.date)
      const dateDiff = (Date.parse(todayDate) - historyDate) / (1000 * 60 * 60 * 24);

      console.log(dateDiff);

      if(dateDiff >= 7 * 16) return;
      tmpData[15 - Math.floor(dateDiff / 7)][todayDay - dateDiff % 7] = history.count;
    });
    setDashBoardState(tmpData);
    console.log("histories:", histories);
    console.log(tmpData);
  }, [histories])
  
  return (
    <Container>
      {dashBoardState?.map((week, idx) => {
        return (
          <ColContainer key={idx}>
            {week?.map((day, index) => {
              return (
                <Box key={index} theme={"default"} count={day}>
                </Box>
              )
            })}
          </ColContainer>
        )
      })}
    </Container>
  )
}
