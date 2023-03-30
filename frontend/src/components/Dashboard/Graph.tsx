import tw, { styled, css } from 'twin.macro';
import GraphContent from "./GraphContent";

const GraphContainer = tw.div`w-full h-fit`;

export default function Graph() {
  const tmpData = [
    { category: "React", count: 100 },
    { category: "Javascript", count: 85 },
    { category: "Typescript", count: 70 },
    { category: "Vue", count: 55 },
    { category: "Spring", count: 40 },
  ]

  return (
    <GraphContainer>
      {tmpData?.map((data, idx) => {
        return (
          <GraphContent key={idx} data={data}/>
        )
      })}
    </GraphContainer>
  )
}
