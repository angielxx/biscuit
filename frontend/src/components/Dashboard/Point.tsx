import tw from 'twin.macro';
import { useState } from 'react';

const Logo = tw.img`w-8 h-8 mr-2`;
const QuestionBtn = tw.img`w-5 h-5`

const Icon = ({ category }: { category: string }) => {
  const imgSrc = `src/assets/icons/${category}.svg`;
  const [isExists, setIsExists] = useState(false);

  function checkLocalImgFileExists(imgSrc: string) {
    let img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      setIsExists(true);
    };
    img.onerror = function () {
      setIsExists(false);
    };
  }
  checkLocalImgFileExists(imgSrc);

  return isExists === true
    ? category === "Point"
      ? <Logo src={imgSrc} />
      : <QuestionBtn src={imgSrc}/>
    : <Logo />;
};

const PointContainer = tw.div`flex flex-row`;
const PointValue = tw.span`text-h3 text-white`;

type PointProps = {
  point: number;
}

export default function Point({point}: PointProps) {
  return (
    <>
      <Icon category="QuestionMark" />
      <PointContainer>
        <Icon category="Point" />
        {point!==undefined && <PointValue>{point}</PointValue>}
      </PointContainer>
    </>
  )
}
