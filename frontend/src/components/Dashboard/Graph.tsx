import tw, { styled, css } from 'twin.macro';
import GraphContent from "./GraphContent";

const GraphContainer = tw.div`w-full h-fit`;

type Graph = {
  category: string;
  count: number;
}

interface GraphProps {
  graphs: Graph[]
}

export default function Graph({graphs}: GraphProps) {

  return (
    <GraphContainer>
      {graphs?.map((data, idx) => {
        return (
          <GraphContent key={idx} data={data}/>
        )
      })}
    </GraphContainer>
  )
}
