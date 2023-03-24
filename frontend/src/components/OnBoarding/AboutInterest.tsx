import { useState } from 'react';
import BigCategory from '../common/BigCategory';

// icons
import backspace from '../../assets/icons/backspace.svg';

type ClickHanlder = (item: string) => void;

const AboutInterest = () => {
  const [isCategory, setIsCategory] = useState<boolean>(false);
  const [page, setPage] = useState<number>();

  const goBack = () => {
    console.log("뒤로 가기");
  }

  const mainCateList = [
    {
      id: 0,  //e.g. 03,
      mainName: "FrontEnd",  //e.g. "Frontend",
      subCategories: [
        {
          id: 0,  //e.g. 123,
          subName: "React",  //e.g. "React",
        },
        {
          id: 1,  //e.g. 123,
          subName: "TypeScript",  //e.g. "React",
        },
      ],
    },
    {
      id: 1,  //e.g. 03,
      mainName: "BackEnd",  //e.g. "Frontend",
      subCategories: [
        {
          id: 0,  //e.g. 123,
          subName: "Django",  //e.g. "React",
        },
        {
          id: 1,  //e.g. 123,
          subName: "Spring",  //e.g. "React",
        },
      ],
    },
  ]

  const isClicked: ClickHanlder = (item: string) => {
    
  }

  return (
    <>
      <div className='flex items-start'>
        <img src={backspace} onClick={goBack} />
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-h3'>어떤 기술에 관심이 있으신가요?</span>
        <span className='text-sub text-subColor'>관심사에 맞춘 컨텐츠를 홈 화면에서 추천드려요.</span>
      </div>
      <hr className="border-[1px] border-dark-grey20" />
      {mainCateList.map((item, index) => {
        return (
          <BigCategory 
            key={item.id} 
            isCategory={page === index ? true : false}
            isClicked={isClicked}
            item={item}
            onClick={() => {
              setPage(index);
              isCategory ? setIsCategory(false) : setIsCategory(true);
            }}
          />
        )
      })}
    </>
  )
}

export default AboutInterest;