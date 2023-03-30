import tw, { styled, css } from 'twin.macro';

const Container = tw.div`
  w-full h-fit flex
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

export default function Contributions() {
  const tmpData: number[][] = [];
  for(let i=0; i<16; i++) {
    tmpData.push([]);
    tmpData[i].push(0, 1, 2, 3, 4, 5, 6);
  }
  
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
